import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Expenses as Exp } from "@/lib/mongodb/model/Expenses.model";
import { parseISO, format } from "date-fns";

//  @desc GET All EXPENSES
export async function GET() {
  const expenses = await Exp.find().sort({ date: -1, _id: -1 }).lean().exec();

  return NextResponse.json({ data: expenses }, { status: 200 });
}

//  @desc CREATE A Expenses
export async function POST(req: Request) {
  const { name, amount, category, date } = await req.json();

  try {
    const expense = new Exp({ name, amount, category, date });

    await expense.save();

    return NextResponse.json({ message: "Expenses successfully added." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
