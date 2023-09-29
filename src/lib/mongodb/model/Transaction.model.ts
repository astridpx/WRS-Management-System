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
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    discount: Number,
    paid: Boolean,
    balance: Number,
    orders: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId, //? ID OF ITEMS
          ref: "Items",
        },
        qty: Number,
        isBuy: Boolean,
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