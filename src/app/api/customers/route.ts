import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Customer } from "@/lib/mongodb/model/Customer.model";
import { Items } from "@/lib/mongodb/model/Items.model";

//  @desc GET All Customers
export async function GET() {
  const customers = await Customer.find()
    .populate({
      path: "borrowed_gal.item",
      select: "-stock_history",
      model: Items,
    })
    .lean()
    .exec();

  return NextResponse.json({ data: customers }, { status: 200 });
}

//  @desc CREATE A NEW CUSTOMER
export async function POST(req: Request) {
  const {
    first_name,
    last_name,
    mobile1,
    mobile2,
    address,
    street,
    brgy,
    city,
    comment,
    item,
    isMain,
  } = await req.json();

  // const borrow ={
  //   item: "id",
  //   borrowed: 3
  // }

  const newCustomer = {
    first_name,
    last_name,
    mobile1,
    mobile2,
    address,
    street,
    brgy,
    city,
    comment,
    isMain,
    borrowed_gal: item,
  };

  try {
    await Customer.create(newCustomer);

    return NextResponse.json({ message: "Customer successfully created." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
