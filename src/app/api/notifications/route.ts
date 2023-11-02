import { connectDB } from "@/lib/mongodb/config/connect-db";
import { NextResponse } from "next/server";
import { Notif } from "@/lib/mongodb/model/Notifications.model";

//  @desc GET All NOTIFICATIONS
export async function GET() {
  const notification = await Notif.find().sort({ date: -1 }).lean();

  return NextResponse.json({ data: notification }, { status: 200 });
}

// CREATE NOTIF
export async function POST(req: Request) {
  const { data: newItem } = await req.json();

  if (!newItem)
    return NextResponse.json(
      { message: "No Notif data detected." },
      { status: 500 }
    );

  if (newItem.stock <= newItem.reorder) {
    const createNotif = {
      category: "item",
      title: ` ${newItem.name} - ${newItem.category}`,
      body: `Your item has reach the minimum quantity - ${newItem.stock}`,
      img: newItem.img,
      time: new Date().toLocaleTimeString("PST"),
      date: new Date(),
    };

    try {
      await Notif.create(createNotif);

      console.log("Notification successfully created");

      return NextResponse.json(
        { message: "You have new notification." },
        { status: 200 }
      );
    } catch (error) {
      console.error("NOTIF-ERROR :", error);
      NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
  }
}
