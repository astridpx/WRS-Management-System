import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";

//  @desc GET  Credit
export async function GET() {
  const credits = await Trans.find()
    .populate("customer")
    .select("-mobile2  -mobile1")
    .lean();

  return NextResponse.json({ data: credits }, { status: 200 });
}
