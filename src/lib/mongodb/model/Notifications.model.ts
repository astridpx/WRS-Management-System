import mongoose from "mongoose";
import { connectDB } from "../config/connect-db";

connectDB();
mongoose.Promise = global.Promise;

const NotifSchema = new mongoose.Schema(
  {
    category: String,
    title: String,
    body: String,
    img: String,
    stock: Number,
    time: String,
    date: Date,
  },
  {
    timestamps: true,
  }
);

export const Notif =
  mongoose.models.Notifications || mongoose.model("Notifications", NotifSchema);
