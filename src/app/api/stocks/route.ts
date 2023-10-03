import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Items } from "@/lib/mongodb/model/Items.model";

//  @desc GET All ITEMS
export async function GET() {
  const items = await Items.find().lean();

  return NextResponse.json({ data: items }, { status: 200 });
}
