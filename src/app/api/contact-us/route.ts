import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ContactUsMessageMailer } from "./contact-mailer";
import { v4 as uuidv4 } from "uuid";

// CONTACT-US SEND MESSAGE
export async function POST(req: Request) {
  const { email, name, message } = await req.json();

  try {
    const mailer = await ContactUsMessageMailer(email, name, message);
    if (mailer === false)
      return NextResponse.json(
        { message: "Nodemailer error" },
        { status: 500 }
      );

    return NextResponse.json({
      message: "Email successfully sent.",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
