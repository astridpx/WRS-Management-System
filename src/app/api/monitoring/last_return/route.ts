import { NextResponse } from "next/server";
import { Customer } from "@/lib/mongodb/model/Customer.model";

//  @desc GET  Customers DATA
export async function GET() {
  const customers = await Customer.find({
    $or: [{ "borrowed_gal.borrowed": { $gt: 0 } }],
  })
    .select("-mobile1 -mobile2")
    .populate({
      path: "borrowed_gal.item",
      select: "img name",
    })
    .lean()
    .exec();

  return NextResponse.json({ data: customers }, { status: 200 });
}
