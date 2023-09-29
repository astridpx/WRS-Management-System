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

    mobile1: {
      type: String,
      required: [true, "Mobile is required"],
    },
    mobile2: {
      type: String,
    },
    isVillage: Boolean,
    address: String, //? this is for customer not live on howard subd
    blk: String,
    lot: String,
    phase: String,
    comment: String,
    borrowed_gal: {
      slim: {
        borrowed: Number,
        last_return: Date,
        gal_type: { type: String, default: "Slim" },
      },
      round: {
        borrowed: Number,
        last_return: Date,
        gal_type: { type: String, default: "Round" },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Customer =
  mongoose.models.Customers || mongoose.model("Customers", CustomerSchema);
