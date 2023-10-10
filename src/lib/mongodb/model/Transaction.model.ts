import mongoose from "mongoose";
import { connectDB } from "../config/connect-db";

connectDB();
mongoose.Promise = global.Promise;

const TransactionSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    service: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    discount: Number,
    paid: Boolean,
    balance: Number,
    isBuy: Boolean,
    time: String, // time whre it will  be deliver
    deliverBy: {
      type: String,
      default: "none",
      required: false,
    },
    orders: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Items",
        },
        qty: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Trans =
  mongoose.models.Transactions ||
  mongoose.model("Transactions", TransactionSchema);
