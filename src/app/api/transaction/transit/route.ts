import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";

//  @desc MARK ORDER ON IN TRANSIT
export async function POST(req: Request) {
  const { orderId } = await req.json();

  try {
    if (orderId.length === 0)
      return NextResponse.json(
        { message: "Orderm ID is required." },
        { status: 400 }
      );

    const isValid = await orderId?.map(async (d: any) => {
      await Trans.findByIdAndUpdate(d.id, {
        status: "In Transit",
      });
    });

    return NextResponse.json({ message: "Orders is now in Transit." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
