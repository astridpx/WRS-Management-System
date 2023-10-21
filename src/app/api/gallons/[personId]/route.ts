import { NextResponse } from "next/server";
import { Customer } from "@/lib/mongodb/model/Customer.model";
import { Trans } from "@/lib/mongodb/model/Transaction.model";
import mongoose from "mongoose";

export async function PUT(req: Request, { params }: any) {
  const { personId } = await params;
  const { item } = await req.json();
  const id = personId.trim();

  try {
    // ? CHECK CUSTOMER ID IF EXIST
    const isExist: any = await Customer.findById(id).lean().exec();

    if (!isExist)
      return NextResponse.json(
        { message: "Unique Id not found." },
        { status: 400 }
      );

    // loop the item array
    await Promise.all(
      item.map((d: any) => {
        const itemIdToFilter = new mongoose.Types.ObjectId(d.itemId); // convert into mongoose id

        // check !exist
        const borrowedItem = isExist.borrowed_gal.find((item: any) =>
          item.item.equals(itemIdToFilter)
        );

        if (!borrowedItem) return false; // if !exist return false

        // if thw return qty | req qty is less than borrowed gal decrement and not delete
        if (d.returnQty < borrowedItem.borrowed) {
          return Customer.findOneAndUpdate(
            { _id: id, "borrowed_gal.item": d.itemId },
            {
              $inc: {
                "borrowed_gal.$.borrowed": -d.returnQty,
              },
            }
          );

          //   else if the return qty is greater than borrowed or euivalent with borroed delete
        } else {
          return Customer.findOneAndUpdate(
            { _id: id, "borrowed_gal.item": d.itemId },
            {
              $pull: {
                borrowed_gal: {
                  item: d.itemId,
                },
              },
            }
          );
        }
      })
    );

    return NextResponse.json({
      message: "Customer gallon returned successfully.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
