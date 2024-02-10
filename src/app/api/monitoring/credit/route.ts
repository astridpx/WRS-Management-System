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
    .sort({ date: -1 })
    .lean()
    .exec();

  return NextResponse.json({ data: credits }, { status: 200 });
}

export async function PUT(req: Request) {
  const { transId, credit } = await req.json();

  try {
    await Trans.findByIdAndUpdate(transId, { balance: credit });

    return NextResponse.json({ message: "Payment Updated Successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
