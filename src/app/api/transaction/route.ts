import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";
import { Customer } from "@/lib/mongodb/model/Customer.model";
import { Items } from "@/lib/mongodb/model/Items.model";

//  @desc GET All TRANSACTION
export async function GET() {
  try {
    const transactions = await Trans.find({ service: "Deliver" })
      .populate("customer")
      .populate({
        path: "orders.item",
        select: "img name category",
        model: Items,
      })
      .sort({ date: -1 })
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
    orders,
    isBuy,
    time,
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
    time,
    orders,
  };

  try {
    await Trans.create(newTrans);

    // @desc Update the last_return of borrowed gallon
    const customer = await Customer.findOneAndUpdate(
      {
        _id: customerId,
        borrowed_gal: {
          $elemMatch: {
            item: { $in: orders.map((d: any) => d.item) },
            borrowed: { $gt: 0 },
          },
        },
      },
      {
        $set: {
          "borrowed_gal.$[elem].last_return": date,
        },
      },
      {
        arrayFilters: [
          {
            "elem.item": { $in: orders.map((d: any) => d.item) },
            "elem.borrowed": { $gt: 0 },
          },
        ],
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
