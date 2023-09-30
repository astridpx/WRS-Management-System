import mongoose from "mongoose";
import { connectDB } from "../config/connect-db";

connectDB();
mongoose.Promise = global.Promise;

const ExpensesSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Expenses =
  mongoose.models.Expenses || mongoose.model("Expenses", ExpensesSchema);
