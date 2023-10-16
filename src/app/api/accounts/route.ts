import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Acc } from "@/lib/mongodb/model/Accounts.model";

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

//  GET All accounts
export async function GET() {
  const accounts = await Acc.find({
    main: { $ne: true },
  })
    .select("-hash_password")
    .lean();

  return NextResponse.json({ data: accounts }, { status: 200 });
}

//  @desc POST req creating a new accounts
export async function POST(req: Request) {
  const { first_name, last_name, email, username, password } = await req.json();

  //  Confrim Data
  if (!password || !first_name || !last_name || !email || !username)
    return NextResponse.json(
      { message: "All field is required." },
      { status: 404 }
    );

  const hash_password = await hashPassword(password);

  //  Check duplicate
  const isEmail = await Acc.findOne({ email }).lean().exec();
  const isUsername = await Acc.findOne({ username }).lean().exec();

  if (isEmail)
    return NextResponse.json(
      { message: "Email is already exist." },
      { status: 404 }
    );
  if (isUsername)
    return NextResponse.json(
      { message: "Username is already exist." },
      { status: 404 }
    );

  try {
    await Acc.create({
      first_name,
      last_name,
      email,
      username,
      hash_password,
    });

    return NextResponse.json({ message: "User successfully created." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
