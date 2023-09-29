import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Items } from "@/lib/mongodb/model/Items.model";

//  @desc GET All ITEMS
export async function GET() {
  const items = await Items.find().lean();

  return NextResponse.json({ data: items }, { status: 200 });
}

//  @desc CREATE A ITEM
export async function POST(req: Request) {
  const { name, img, category, reorder, pos_item, price, buy_price } =
    await req.json();

  try {
    await Items.create({
      name,
      img,
      category,
      reorder,
      pos_item,
      price,
      buy_price,
    });

    return NextResponse.json({ message: "New Item successfully created." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
