import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextResponse } from "next/server";

// @desc GET DATA OF PROFILE ACC
export async function POST(req: Request) {
  const { accId } = await req.json();

  const id = accId?.trim();

  try {
    const User = await Acc.findById(id).select("-hash_password").lean();

    return NextResponse.json({ data: User });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
