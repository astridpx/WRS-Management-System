import { NextResponse } from "next/server";
import { Trans } from "@/lib/mongodb/model/Transaction.model";
import { Customer } from "@/lib/mongodb/model/Customer.model";
import { Items } from "@/lib/mongodb/model/Items.model";
import { format } from "date-fns";
import { OrderMailer } from "./order-email";
import { IoConstructOutline } from "react-icons/io5";

//  @desc MARK ORDER INTO DELIVERED
export async function POST(req: Request) {
  const { orderId } = await req.json();
  console.log(orderId);
  // [ { id: '6525cf944de3ecc572d3d777' } ]
  try {
    if (orderId.length === 0)
      return NextResponse.json(
        { message: "Orderm ID is required." },
        { status: 400 }
      );

    await orderId?.map(async (d: any) => {
      const orders = await Trans.findByIdAndUpdate(
        d.id,
        {
          status: "Delivered",
        },
        { new: true }
      )
        .populate({
          path: "orders.item",
          select: "name price buy_price",
          model: Items,
        })
        .populate({
          path: "customer",
          select: "first_name last_name email isMain address street brgy city",
          model: Customer,
        })
        .exec();

      const order_detail = {
        trn: d.id,
        customer_name: `${orders.customer.first_name} ${orders.customer.last_name}`,
        email: orders.customer.email,
        amount: orders.amount,
        orders: orders.orders,
        balance: orders.balance,
        discount: orders.discount,
        isBuy: orders.isBuy,
        deliver_date: format(new Date(), "MMMM dd, y"),
        addr: orders.customer.isMain
          ? orders.customer.address
          : `${orders.customer.street} ${orders.customer.brgy} ${orders.customer.city}`,
      };

      // EMAIL THE ORDER ON CUSTOMER
      if (orders?.customer?.email) {
        OrderMailer(order_detail);
      }
    });
    return NextResponse.json({ message: "Orders is successfully delivered." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
