import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";
import { Customer } from "@/lib/mongodb/model/Customer.model";
import { Items } from "@/lib/mongodb/model/Items.model";

//  @desc GET All TRANSACTION
export async function GET() {
  try {
    const transactions = await Trans.find()
      .populate({
        path: "customer",
        model: Customer,
      })
      .populate({
        path: "orders.item",
        select: "img name category",
        model: Items,
      })
      .sort({ _id: -1, date: -1 })
      .lean()
      .exec();

    return NextResponse.json({ data: transactions }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
