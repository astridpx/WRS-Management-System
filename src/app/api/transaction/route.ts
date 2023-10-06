import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";
import { Customer } from "@/lib/mongodb/model/Customer.model";

//  @desc GET All TRANSACTION
export async function GET() {
  const transactions = await Trans.find().populate("customer").lean().exec();

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
    slim_qty,
    round_qty,
    isBuy,
  } = await req.json();

  const customerId = customer?.trim();

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
    orders: [
      {
        slim: {
          qty: slim_qty,
        },
        round: {
          qty: round_qty,
        },
      },
    ],
  };

  try {
    // await Trans.create(newTrans);

    const x = await Customer.findOneAndUpdate(
      {
        _id: customerId,
        $or: [
          { "borrowed_gal.slim.borrowed": { $gt: 0 } },
          { "borrowed_gal.round.borrowed": { $gt: 0 } },
        ],
      },
      {
        $set: {
          "borrowed_gal.slim.last_return": date,
          "borrowed_gal.round.last_return": date,
        },
      }
    );

    return NextResponse.json({ message: "New transaction created." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
