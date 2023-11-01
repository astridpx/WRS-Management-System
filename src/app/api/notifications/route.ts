import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Notif } from "@/lib/mongodb/model/Notifications.model";

//  @desc GET All NOTIFICATIONS
export async function GET() {
  const notification = await Notif.find().sort({ date: 1 }).lean();

  return NextResponse.json({ data: notification }, { status: 200 });
}
