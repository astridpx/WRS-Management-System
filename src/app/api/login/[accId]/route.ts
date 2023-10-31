import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  const { accId } = params;

  const { username, isDesktop, deviceName, time, date, ip, address } =
    await req.json();

  console.log({
    username,
    isDesktop,
    deviceName,
    time,
    date,
    ip,
    address,
  });

  try {
    // ? CHECK CUSTOMER ID IF EXIST
    const isExist = await Acc.findOne({ username }).exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Username not found." },
        { status: 400 }
      );

    await Acc.findOneAndUpdate(
      { username },
      {
        last_active: new Date(),
        $push: {
          login_history: {
            isDesktop: isDesktop,
            deviceName: deviceName || "Unknown",
            ip,
            date,
            time,
            address,
          },
        },
      }
    );

    return NextResponse.json({ message: "Login successfully recorded." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: any) {
  const { accId } = params;

  const id = accId.trim();

  try {
    // ? CHECK CUSTOMER ID IF EXIST
    const isExist = await Acc.findById(id).lean().exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    await Acc.findByIdAndUpdate(id, { $set: { login_history: [] } }).exec();

    return NextResponse.json({
      message: "Login history successfully cleared.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
