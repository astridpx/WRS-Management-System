import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MessageMailer } from "./Mailer";
import { v4 as uuidv4 } from "uuid";

// GENERATE RANDOM CODE
function generateRandomCode() {
  const randomNumbers = [];
  for (let i = 0; i < 4; i++) {
    // Generate version 4 UUID
    const randomNumber = uuidv4();

    // Extract and push the first digit of the numeric part of the UUID
    const numericPart = parseInt(randomNumber.replace(/-/g, ""), 16);
    const singleDigit = numericPart % 10;
    randomNumbers.push(singleDigit);
  }
  return randomNumbers.join("");
}

// Login Forgot Password
export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const code = await generateRandomCode();
    const user = await Acc.findOne({ email }).lean().exec();

    if (!user)
      return NextResponse.json(
        { message: "Email not exist." },
        { status: 404 }
      );

    //   GENERATE EMAIL TOKEN FOR FORGOT PASSWORD
    const passResetToken = await jwt.sign(
      { email: email, code: code },
      `${process.env.PRIVATE_TOKEN_KEY}`,
      {
        expiresIn: "3m",
      }
    );

    const mailer = await MessageMailer(email, code);
    if (mailer === false)
      return NextResponse.json(
        { message: "Nodemailer error" },
        { status: 500 }
      );

    await Acc.findOneAndUpdate(
      { email },
      {
        pass_reset_code: code,
        pass_reset_token: passResetToken,
      }
    );

    return NextResponse.json({
      status: true,
      step: "otp",
      message:
        "User indetity validated. Pls Check your email to verify the code",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
