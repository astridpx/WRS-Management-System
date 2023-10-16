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

// @desc  UPDATE ACCOUNTS ACCESS
export async function PUT(req: Request, { params }: any) {
  const { role, status, password } = await req.json();
  const { accId } = await params;
  const id = accId.trim();

  try {
    // check if ID is exist
    const isExist = await Acc.findById(id).lean();

    if (!isExist)
      return NextResponse.json(
        { message: "Uniquer ID not found." },
        { status: 500 }
      );

    //   encrypted password
    const hash_password = await hashPassword(password);

    // check if there is password
    if (!password) {
      await Acc.findByIdAndUpdate(id, {
        role,
        active: status,
      }).exec();
    } else {
      await Acc.findByIdAndUpdate(id, {
        role,
        active: status,
        hash_password,
      }).exec();
    }

    return NextResponse.json({ message: "Account updated successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

// @desc DELETE ACCOUNT
export async function DELETE({ params }: any) {
  const { accId } = await params;
  const id = accId.trim();

  try {
    // check if ID is exist
    const isExist = await Acc.findById(id).lean();

    if (!isExist)
      return NextResponse.json(
        { message: "Uniquer ID not found." },
        { status: 500 }
      );

    await Acc.findByIdAndDelete(id).exec();

    return NextResponse.json({ message: "Account deleted successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
