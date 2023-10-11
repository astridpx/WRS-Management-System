import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";
import { Items } from "@/lib/mongodb/model/Items.model";

//  @desc GET  Credit
export async function GET() {
  const credits = await Trans.find({ balance: { $gt: 0 } })
    .populate("customer")
    .populate({
      path: "orders.item",
      select: "img name",
      model: Items,
    })
    .lean()
    .exec();

  return NextResponse.json({ data: credits }, { status: 200 });
}
