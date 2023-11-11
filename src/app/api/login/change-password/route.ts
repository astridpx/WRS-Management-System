import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//  Password HAsher
const hashPassword = async (pass: any) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// @desc CHANGE PASSWORD
export async function POST(req: Request) {
  const { email, password, cpassword, accId } = await req.json();

  if (password !== cpassword)
    return NextResponse.json(
      { message: "Confirm password didn't match." },
      { status: 500 }
    );

  if (password.length < 5)
    return NextResponse.json(
      { message: "Password must be atleast 5 characters." },
      { status: 500 }
    );

  try {
    const hash_password = await hashPassword(password);

    const User: any = await Acc.findOne({ email }).lean();

    if (!User)
      return NextResponse.json(
        { message: "Email not found." },
        { status: 500 }
      );

    const passDispatchToken = await jwt.sign(
      { User },
      `${process.env.PRIVATE_TOKEN_KEY}`,
      {
        expiresIn: "1",
      }
    );

    await Acc.findOneAndUpdate(
      { email },
      {
        hash_password,
        pass_reset_token: passDispatchToken,
      }
    );

    return NextResponse.json({ message: "Password successfully changed." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
