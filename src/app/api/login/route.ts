import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { Customer } from "@/lib/mongodb/model/Customer.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  addMinutes,
  differenceInMinutes,
  differenceInSeconds,
  isPast,
} from "date-fns";

export async function POST(req: Request) {
  const { username, password, role } = await req.json();

  try {
    let user = null;
    let isUser = false;

    if (role === "guest") {
      user = await Customer.findOne({ email: username })
        .select("-borrowed_gal")
        .exec();

      isUser = user ? true : false;
    } else {
      user = await Acc.findOne({ username }).select("-login_history").exec();

      isUser = user ? true : false;
    }

    if (!isUser) {
      return NextResponse.json(
        { message: "Username or Email is invalid." },
        { status: 404 }
      );
    }

    // FIND A VALIF MODEL AND QUERY VALUE
    const invalidUser = role === "guest" ? { email: username } : { username };
    const invalidModel = role === "guest" ? Customer : Acc;

    // IF THE ATTEMPT IS GREATER THAN IT MEANS IT'S TIME TO SET A 3 MIN TIME COOLDOWN
    if (user.login_freeze.attempt >= 3)
      user = await invalidModel.findOneAndUpdate(
        { ...invalidUser },
        {
          $set: {
            "login_freeze.cooldown": addMinutes(new Date(), 3),
          },
        },
        { new: true }
      );

    // CHECK IF THE COOLDOWN TIME IS PAST
    // GET THE MINUTES AND SECONDS REMAINING
    const isFreeze = isPast(new Date(user.login_freeze.cooldown));
    const secondsRemaining = differenceInSeconds(
      new Date(user.login_freeze.cooldown),
      new Date()
    );
    const MinuteRemaining = differenceInMinutes(
      new Date(user.login_freeze.cooldown),
      new Date()
    );

    // CHECK ACC FREEZE IF IT'S IN COOLDOWN
    if (isFreeze === false || user.login_freeze.attempt >= 3) {
      // RESET THE LOGIN ATTEMPT IF THE ATTEMOT IS GREATER THAN 3 OR EQUAL 3
      await invalidModel.findOneAndUpdate(
        { ...invalidUser },
        {
          $set: {
            "login_freeze.attempt": 0,
          },
        }
      );
      return NextResponse.json(
        {
          message: `Sorry, this account is still have ${
            secondsRemaining <= 60
              ? `${secondsRemaining} sec`
              : `${MinuteRemaining} min`
          } cooldown.`,
          cooldown: secondsRemaining <= 60 ? secondsRemaining : MinuteRemaining,
        },
        { status: 404 }
      );
    }

    // CHECK INVALID PASSWORD
    const validPassword = await bcrypt.compare(password, user.hash_password);
    if (!validPassword) {
      // increment login attempt
      await invalidModel.findOneAndUpdate(
        { ...invalidUser },
        {
          $inc: { "login_freeze.attempt": 1 },
        }
      );

      return NextResponse.json(
        { message: "Invalid password." },
        { status: 400 }
      );
    }

    if (role !== "guest" && !user.active)
      // Check if acc is deactivated
      return NextResponse.json(
        { message: "Sorry, this account is deactivated." },
        { status: 404 }
      );

    // Create a new user object without the hash_password property
    const sanitizedUser = { ...user.toObject() };
    delete sanitizedUser.hash_password;

    // RESET THE LOGIN ATTEMPT CO'Z HE DID LOGINED
    await invalidModel.findOneAndUpdate(
      { ...invalidUser },
      {
        $set: {
          "login_freeze.attempt": 0,
        },
      }
    );

    return NextResponse.json({
      message: "Login Successfull",
      isAuth: true,
      user: sanitizedUser,
    });
  } catch (error) {
    console.log("Login ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
