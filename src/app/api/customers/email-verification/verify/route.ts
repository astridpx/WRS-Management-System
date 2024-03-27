import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Customer } from "@/lib/mongodb/model/Customer.model";

// EMAIL VERIFICATION
export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const decoded: any = await jwt.verify(
      token,
      `${process.env.PRIVATE_TOKEN_KEY}`,
      function (err: any, decoded: any) {
        if (decoded) return decoded;
        else err;
      }
    );

    // CHECK IF TOKEN IS EXPIRED
    if (decoded === undefined)
      return NextResponse.json(
        {
          message: "Invalid Token!! This email is already expired.",
        },
        { status: 400 }
      );

    // VALIDATE EMAIL
    const isEmail = await Customer.findOne({ email: decoded?.email }).exec();
    if (!isEmail)
      return NextResponse.json(
        {
          message: "The email is invalid.",
        },
        { status: 400 }
      );

    await Customer.findOneAndUpdate(
      {
        email: decoded?.email,
      },
      {
        verifiedEmail: decoded?.email,
      }
    ).exec();

    return NextResponse.json({
      message: "Email successfully verified.",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
