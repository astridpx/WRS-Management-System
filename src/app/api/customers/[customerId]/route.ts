import { NextResponse } from "next/server";
import { Customer } from "@/lib/mongodb/model/Customer.model";

// @des UPDATEM SPECIFIC CUSTOMER DATA

export async function PUT(req: Request, { params }: any) {
  const { customerId } = params;
  const {
    first_name,
    last_name,
    mobile1,
    mobile2,
    address,
    blk,
    lot,
    phase,
    comment,
    slim,
    round,
    isVillage,
  } = await req.json();
  const id = customerId.trim();

  const updateCustomer = {
    first_name,
    last_name,
    mobile1,
    mobile2,
    address,
    blk,
    lot,
    phase,
    comment,
    isVillage,
    $set: {
      "borrowed_gal.slim.borrowed": slim,
      "borrowed_gal.round.borrowed": round,
    },
  };

  try {
    // ? CHECK CUSTOMER ID IF EXIST
    const isExist = await Customer.findById(id).lean().exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    await Customer.findByIdAndUpdate(id, updateCustomer).exec();

    return NextResponse.json({ message: "Customer updated successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

// @des DELETE SPECIFIC CUSTOMER

export async function DELETE(req: Request, { params }: any) {
  const { customerId } = params;

  try {
    const isExist = await Customer.findById(customerId).lean().exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    await Customer.findByIdAndDelete(customerId).exec();

    return NextResponse.json({ message: "Customer Deleted Successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
