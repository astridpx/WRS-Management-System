import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Customer } from "@/lib/mongodb/model/Customer.model";

// @desc  UPDATE CUSTOMER ACCOUNTS DETAILS
export async function PUT(req: Request, { params }: any) {
  const { first_name, last_name, email, mobile, street, city, brgy } =
    await req.json();
  const { customerId } = await params;
  const id = customerId.trim();

  const updateCustomer = {
    first_name,
    last_name,
    email,
    mobile,
    street,
    brgy,
    city,
  };

  try {
    // check if ID is exist AND EMAIL
    const isExist = await Customer.findById(id).lean();
    const isEmail = await Customer.findOne({ email }).exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique ID not found." },
        { status: 500 }
      );

    if (isEmail && isEmail?._id?.toString() !== id)
      return NextResponse.json(
        { message: "Email is already exist." },
        { status: 404 }
      );

    const newCustomer: any = await Customer.findByIdAndUpdate(
      id,
      updateCustomer,
      { new: true }
    )
      .lean()
      .exec();

    // Remove some fields
    if (newCustomer && newCustomer.hash_password) {
      delete newCustomer.hash_password;
      delete newCustomer.borrowed_gal;
    }

    return NextResponse.json({
      message: "Account updated successfully.",
      updated_data: newCustomer,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

//  Password HAsher
const hashPassword = async (pass: any) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// @desc CHANGE PASSWORD
export async function POST(req: Request, { params }: any) {
  const { currentPass, password, cpassword, accId } = await req.json();

  const id = accId?.trim();

  if (!currentPass || !password || !cpassword)
    return NextResponse.json(
      { message: "All fields is required." },
      { status: 500 }
    );

  if (password !== cpassword)
    return NextResponse.json(
      { message: "Confirm password didn't match." },
      { status: 500 }
    );

  if (password.length < 5)
    return NextResponse.json(
      { message: "Password must be atleast 5 characters." },
      { status: 500 }
    );

  try {
    const hash_password = await hashPassword(password);

    const User: any = await Customer.findById(id);
    const validPassword = await bcrypt.compare(
      currentPass,
      User?.hash_password
    );

    if (!User)
      return NextResponse.json(
        { message: "Unique ID not found." },
        { status: 500 }
      );

    if (!validPassword)
      return NextResponse.json(
        { message: "Current password didn't match." },
        { status: 400 }
      );

    await Customer.findByIdAndUpdate(id, {
      hash_password,
    });

    return NextResponse.json({ message: "Password successfully changed." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
