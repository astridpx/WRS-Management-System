import { connectDB } from "@/lib/mongodb/config/connect-db";
import User from "@/lib/mongodb/model/User.model";
import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { ILogin } from "../../../../typings";

export async function POST(req: Request) {
  const { username, password, role }: ILogin = await req.json();

  try {
    const user = await Acc.findOne({ username, role }).exec();

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

    return NextResponse.json({
      message: "Login Successfull",
      isAuth: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
