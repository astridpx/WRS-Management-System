import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Items } from "@/lib/mongodb/model/Items.model";
import { Customer } from "@/lib/mongodb/model/Customer.model";

// @desc UPDATE ITEMS

export async function PUT(req: Request, { params }: any) {
  const { itemId } = params;
  const Id = itemId.trim();
  const { name, img, category, reorder, pos_item, price, buy_price } =
    await req.json();

  const updateItem = {
    name,
    img,
    category,
    reorder,
    pos_item,
    price,
    buy_price,
  };

  try {
    // ? CHECK ID IF EXIST
    const isExist = await Items.findById(Id).lean().exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    await Items.findByIdAndUpdate(Id, updateItem).exec();

    return NextResponse.json({ message: "Item updated successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

// @des DELETE SPECIFIC ITEM

export async function DELETE(req: Request, { params }: any) {
  const { itemId } = params;

  try {
    const isExist = await Items.findById(itemId).lean().exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    const isBorrowed = await Customer.findOne({
      "borrowed_gal.item": itemId,
      "borrowed_gal.borrowed": { $gt: 0 },
    }).exec();

    if (isBorrowed)
      return NextResponse.json(
        { message: "This item is currently borrowed." },
        { status: 400 }
      );

    await Items.findByIdAndDelete(itemId).exec();

    return NextResponse.json({ message: "Item Removed Successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
