import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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
export async function POST(req: Request, { params }: any) {
  const { currentPass, password, cpassword, accId } = await req.json();

  const id = accId?.trim();

  if (!currentPass || !password || !cpassword)
    return NextResponse.json(
      { message: "All fields is required." },
      { status: 500 }
    );

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

    const User: any = await Acc.findById(id).lean();
    const validPassword = await bcrypt.compare(
      currentPass,
      User?.hash_password
    );

    if (!User)
      return NextResponse.json(
        { message: "Uniquer ID not found." },
        { status: 500 }
      );

    if (!validPassword)
      return NextResponse.json(
        { message: "Current password didn't match." },
        { status: 400 }
      );

    await Acc.findByIdAndUpdate(id, {
      hash_password,
    });

    return NextResponse.json({ message: "Password successfully changed." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

// @desc UPDATE PROFILE DETAILS OF LOGIN ACC
export async function PUT(req: Request, { params }: any) {
  const { profileId } = await params;
  const { fname, lname, username, email } = await req.json();

  const id = profileId?.trim();

  const user = username?.trim();

  if (user?.length < 4)
    return NextResponse.json(
      { message: "Username must be atleast 4 characters." },
      { status: 500 }
    );

  try {
    //  Check duplicate
    const User = await Acc.findById(id).lean().exec();
    const isEmail: any = await Acc.findOne({ email }).lean().exec();
    const isUsername: any = await Acc.findOne({ username }).lean().exec();

    if (!User)
      return NextResponse.json(
        { message: "Uniquer ID not found." },
        { status: 500 }
      );
    if (isEmail && isEmail?._id?.toString() !== id)
      return NextResponse.json(
        { message: "Email is already exist." },
        { status: 404 }
      );
    if (isUsername && isUsername?._id?.toString() !== id)
      return NextResponse.json(
        { message: "Username is already exist." },
        { status: 404 }
      );

    await Acc.findByIdAndUpdate(id, {
      first_name: fname,
      last_name: lname,
      username,
      email,
    });

    return NextResponse.json({ message: "Profile successfully updated." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

// @desc UPDATE ACCOUNT PROFILE PICTURE
export async function DELETE(req: Request, { params }: any) {
  const { profileId } = await params;
  const { img } = await req.json();

  const id = profileId?.trim();

  try {
    const User = await Acc.findById(id).lean();

    if (!User)
      return NextResponse.json(
        { message: "Unique ID not found." },
        { status: 500 }
      );

    await Acc.findByIdAndUpdate(id, {
      img,
    });

    return NextResponse.json({
      message: "Profile picture successfully updated.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
