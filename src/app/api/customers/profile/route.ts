import { Customer } from "@/lib/mongodb/model/Customer.model";
import { Trans } from "@/lib/mongodb/model/Transaction.model";
import { NextResponse } from "next/server";

// @desc GET DATA OF CUSTOMER PROFILE ACC
export async function POST(req: Request) {
  const { customerId } = await req.json();

  const id = customerId?.trim();

  try {
    const User = await Trans.find({ customer: id })
      .populate({
        path: "customer",
        select:
          "first_name last_name email mobile1 street brgy city borrowed_gal verifiedEmail ",
        model: Customer,
      })
      .exec();

    return NextResponse.json({ data: User });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
