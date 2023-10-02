import mongoose from "mongoose";
import { connectDB } from "../config/connect-db";

connectDB();
mongoose.Promise = global.Promise;

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    img: {
      type: String,
    },

    category: {
      type: String,
      required: true,
    },
    pos_item: {
      type: Boolean,
      required: true,
    },
    reorder: Number,
    price: Number,
    buy_price: Number,
    stock: Number,
    stock_history: [
      {
        worth: Number,
        qty: Number,
        status: String,
        transaction: String,
        date: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Items =
  mongoose.models.Items || mongoose.model("Items", ItemSchema);
