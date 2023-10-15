import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";

// @des DELETE TRANSACTION

export async function DELETE(req: Request, { params }: any) {
  const { transId } = await params;
  const id = await transId.trim();

  try {
    const isExist = await Trans.findById(id).lean().exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    await Trans.findByIdAndDelete(id).exec();

    return NextResponse.json({ message: "Transaction successfully deleted." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
