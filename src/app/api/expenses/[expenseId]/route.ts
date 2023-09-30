import { NextResponse } from "next/server";
import { Expenses as Exp } from "@/lib/mongodb/model/Expenses.model";

// @des UPDATEM SPECIFIC Expenses

export async function PUT(req: Request, { params }: any) {
  const { expenseId } = params;
  const { name, amount, category, date } = await req.json();

  try {
    // ? CHECK CUSTOMER ID IF EXIST
    const isExist = await Exp.findById(expenseId).lean().exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    await Exp.findByIdAndUpdate(expenseId, {
      name,
      amount,
      category,
      date,
    }).exec();

    return NextResponse.json({ message: "Epenses updated successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

// @des DELETE SPECIFIC Expenses

export async function DELETE(req: Request, { params }: any) {
  const { expenseId } = params;

  try {
    const isExist = await Exp.findById(expenseId).lean().exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    await Exp.findByIdAndDelete(expenseId).exec();

    return NextResponse.json({ message: "Expenses Deleted Successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
