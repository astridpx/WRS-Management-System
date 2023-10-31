import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import axios from "axios";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const user = await Acc.findOne({ username })
      .select("-login_history")
      .exec();

    if (!user)
      return NextResponse.json(
        { message: "Username not found" },
        { status: 404 }
      );

    const validPassword = await bcrypt.compare(password, user.hash_password);

    if (!validPassword)
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 400 }
      );

    // Check if acc is deactivated
    if (!user.active)
      return NextResponse.json(
        { message: "Sorry, this account is deactivated." },
        { status: 404 }
      );

    // Create a new user object without the hash_password property
    const sanitizedUser = { ...user.toObject() };
    delete sanitizedUser.hash_password;

    return NextResponse.json({
      message: "Login Successfull",
      isAuth: true,
      user: sanitizedUser,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
