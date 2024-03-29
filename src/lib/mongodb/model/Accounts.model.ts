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
    img: {
      type: String,
      required: false,
      default: "https://github.com/shadcn.png",
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
      default: "staff",
    },
    login_freeze: {
      attempt: {
        type: Number,
        default: 0,
      },
      cooldown: {
        type: Date,
        default: new Date(),
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
    last_active: {
      type: Date,
      default: new Date(),
    },
    pass_reset_code: String,
    pass_reset_token: String,
    otp_cd_expiresAt: Date,
    login_history: [
      {
        isDesktop: Boolean,
        deviceName: String,
        ip: String,
        date: Date,
        time: String,
        address: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Acc =
  mongoose.models.Accounts || mongoose.model("Accounts", AccountSchema);

// async function updateAllCustomersRole() {
//   try {
//     const result = await Acc.updateMany(
//       {},
//       {
//         $set: {
//           "login_freeze.attempt": 0,
//           "login_freeze.cooldown": new Date(),
//         },
//       }
//     );
//     console.log(`documents updated.`);
//   } catch (error) {
//     console.error("Error updating documents:", error);
//   }
// }

// // Call the function to update all documents
// updateAllCustomersRole();
