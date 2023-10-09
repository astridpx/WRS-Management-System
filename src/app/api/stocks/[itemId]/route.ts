import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Items } from "@/lib/mongodb/model/Items.model";

// @desc DELETE STOCK HISTORY

export async function PUT(req: Request, { params }: any) {
  const { itemId } = params;
  const { fieldId } = await req.json();

  //   remove white spaces
  const Id = itemId.trim();
  const FId = fieldId.trim();

  try {
    // ? CHECK ID IF EXIST
    const item = await Items.findOne({
      _id: Id,
      "stock_history._id": FId,
    }).exec();

    if (!item)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    await Items.findOneAndUpdate(
      { _id: Id },
      { $pull: { stock_history: { _id: FId } } }
    ).exec();

    return NextResponse.json({ message: "History removed." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
