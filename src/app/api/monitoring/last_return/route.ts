import { NextResponse } from "next/server";
import { Customer } from "@/lib/mongodb/model/Customer.model";

//  @desc GET  Customers DATA
export async function GET() {
  const customers = await Customer.find({
    $or: [
      { "borrowed_gal.slim.borrowed": { $gt: 0 } },
      { "borrowed_gal.round.borrowed": { $gt: 0 } },
    ],
  })
    .select("-mobile1 -mobile2")
    .lean();

  return NextResponse.json({ data: customers }, { status: 200 });
}
