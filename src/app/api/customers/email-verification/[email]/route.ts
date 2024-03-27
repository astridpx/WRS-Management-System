import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Customer } from "@/lib/mongodb/model/Customer.model";
import { SignUpMessageMailer } from "./send-verify-email";

// EMAIL VERIFICATION
export async function PUT(req: Request, { params }: any) {
  const { email } = params;

  try {
    //   GENERATE EMAIL TOKEN FOR FORGOT PASSWORD
    const emailVerifyToken = await jwt.sign(
      { email: email },
      `${process.env.PRIVATE_TOKEN_KEY}`,
      {
        expiresIn: "5m",
      }
    );

    const isEmail = await Customer.findOne({ email }).exec();

    if (isEmail?.verifiedEmail === email.trim())
      return NextResponse.json({
        message: "This email is already verified.",
      });

    // SEND EMAIL
    const link = `${process.env.NEXTAUTH_URL}/Verification/${emailVerifyToken}`;
    const mailer = await SignUpMessageMailer(email, link);
    if (mailer === false)
      return NextResponse.json(
        { message: "Nodemailer error" },
        { status: 500 }
      );

    return NextResponse.json({
      token: emailVerifyToken,
      message: "Pls check your email to verify your account.",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
