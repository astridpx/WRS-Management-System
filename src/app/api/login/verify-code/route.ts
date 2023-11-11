import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Login Verify code
export async function POST(req: Request) {
  const { email, code } = await req.json();

  if (!code)
    return NextResponse.json(
      { message: "OTP code is required." },
      { status: 400 }
    );

  const Code = code.trim();

  try {
    const user: any = await Acc.findOne({ email, pass_reset_code: Code })
      .lean()
      .exec();

    if (!user)
      return NextResponse.json({ message: "Invalid Code." }, { status: 400 });

    // verify token
    var decoded = jwt.verify(
      user?.pass_reset_token,
      `${process.env.PRIVATE_TOKEN_KEY}`
    );

    return NextResponse.json({
      isMatch: true,
      userId: user._id,
      message: "Code is successfully verified.",
    });
  } catch (error: any) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      console.log("Token has expired");
      return NextResponse.json(
        { message: "This code is expired." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
