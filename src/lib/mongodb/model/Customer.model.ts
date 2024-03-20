import mongoose from "mongoose";
import { connectDB } from "../config/connect-db";

connectDB();
mongoose.Promise = global.Promise;

const CustomerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },

    last_name: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },

    mobile1: {
      type: String,
      required: [true, "Mobile is required"],
    },
    mobile2: {
      type: String,
    },
    isMain: Boolean,
    address: String, //? this is for customer not live on howard subd
    street: String,
    brgy: String,
    city: String,
    comment: String,
    role: {
      type: String,
      default: "guest",
    },
    borrowed_gal: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Items",
        },
        borrowed: Number,
        last_return: { type: Date, default: new Date() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Customer =
  mongoose.models.Customers || mongoose.model("Customers", CustomerSchema);
