import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";

//  @desc GET  Credit
export async function GET() {
  const credits = await Trans.find({ balance: { $gt: 0 } })
    .populate("customer")
    .lean();

  return NextResponse.json({ data: credits }, { status: 200 });
}
