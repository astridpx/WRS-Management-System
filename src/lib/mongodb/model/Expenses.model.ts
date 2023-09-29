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
  date: {
    type: String,
  },
});

export const Expenses =
  mongoose.models.Expenses || mongoose.model("Expenses", ExpensesSchema);
