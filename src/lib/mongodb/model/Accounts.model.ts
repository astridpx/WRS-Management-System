import mongoose from "mongoose";
import { connectDB } from "../config/connect-db";

connectDB();
mongoose.Promise = global.Promise;

const AccountSchema = new mongoose.Schema(
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
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email name is required"],
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username name is required"],
      minlength: 4,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    login_freeze: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Acc =
  mongoose.models.Accounts || mongoose.model("Accounts", AccountSchema);
