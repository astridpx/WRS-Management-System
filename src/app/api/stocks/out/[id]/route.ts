import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Items } from "@/lib/mongodb/model/Items.model";

// @desc STOCK OUT

export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const Id = id.trim();
  const { worth, qty, transaction, date } = await req.json();

  try {
    // ? CHECK ID IF EXIST
    const item = await Items.findById(Id).exec();

    if (!item)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    if (qty <= 0)
      return NextResponse.json(
        { message: "Null value is not allowed." },
        { status: 400 }
      );

    const history = {
      worth,
      qty,
      status: "out",
      transaction,
      date,
    };

    const decStock = item.stock ? (item.stock <= 0 ? 0 : item.stock - qty) : 0;
    console.log(qty);
    console.log(decStock);
    await Items.findByIdAndUpdate(Id, {
      stock: decStock,
      $push: { stock_history: history },
    });

    return NextResponse.json({ message: "Stocks updated successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
