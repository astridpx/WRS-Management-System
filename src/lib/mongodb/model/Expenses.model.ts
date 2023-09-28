import mongoose from "mongoose";

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
