import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Customer } from "@/lib/mongodb/model/Customer.model";

//  @desc GET All Customers
export async function GET() {
  const customers = await Customer.find().lean();

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
    blk,
    lot,
    phase,
    comment,
    slim,
    round,
    isVillage,
  } = await req.json();

  const newCustomer = {
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
    borrowed_gal: {
      slim: {
        borrowed: slim,
      },
      round: {
        borrowed: round,
      },
    },
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
