import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";

//  @desc GET All TRANSACTION
export async function GET() {
  await connectDB();

  const transactions = await Trans.find()
    .lean()
    .populate("customer")
    .populate("orders.item")
    .exec();

  return NextResponse.json({ data: transactions }, { status: 200 });
}

//  @desc CREATE A TRANSAACTION
export async function POST(req: Request) {
  const {
    customer,
    service,
    status,
    date,
    amount,
    discount,
    paid,
    balance,
    item,
    qty,
    isBuy,
  } = await req.json();

  await connectDB();

  const newTrans = {
    customer,
    service,
    status,
    date,
    amount,
    discount,
    paid,
    balance,
    orders: [
      {
        item,
        qty,
        isBuy,
      },
    ],
  };

  try {
    await Trans.create(newTrans);

    return NextResponse.json({ message: "New transaction created." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
