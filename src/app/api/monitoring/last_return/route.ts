import { NextResponse } from "next/server";
import { Customer } from "@/lib/mongodb/model/Customer.model";
import { Items } from "@/lib/mongodb/model/Items.model";

//  @desc GET  Customers DATA
export async function GET() {
  const customers = await Customer.find({
    $or: [{ "borrowed_gal.borrowed": { $gt: 0 } }],
  })
    .select("-mobile1 -mobile2")
    .populate({
      path: "borrowed_gal.item",
      select: "img name",
      model: Items,
    })
    .sort({ "borrowed_gal.last_return": -1 })
    .lean()
    .exec();

  return NextResponse.json({ data: customers }, { status: 200 });
}
