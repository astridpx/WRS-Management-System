import { NextResponse } from "next/server";
import { Notif } from "@/lib/mongodb/model/Notifications.model";

// @desc  UPDATE NOTIF ISOPEN
export async function POST(req: Request) {
  try {
    await Notif.updateMany(
      { isView: false },
      { $set: { isView: true } }
    ).exec();

    console.log("Notif is viewed.");

    return NextResponse.json({ message: "Notif view updated." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
