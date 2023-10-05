import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";

//  @desc GET All TRANSACTION
export async function GET() {
  const transactions = await Trans.find()
    .lean()
    .populate("customer")
    .populate({
      path: "orders.item",
      select: "-stock_history", // Exclude stock_history from orders.item
    })
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
    orders,
  } = await req.json();

  const newOrders = orders?.map((o: any) => {
    return {
      item: o.item,
      qty: o.qty,
    };
  });

  const newTrans = {
    customer,
    service,
    status,
    date,
    amount,
    discount,
    paid,
    balance,
    isBuy,
    orders: newOrders,
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
