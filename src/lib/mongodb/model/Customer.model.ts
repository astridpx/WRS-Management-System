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
    hash_password: {
      type: String,
      default: "$2b$10$PHWV6W57AkLpFHbeCi3qjOpALTe3EBySFQSzzMt/fWRNjA7NON1OS",
      required: true,
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
    pass_reset_code: String,
    pass_reset_token: String,
    otp_cd_expiresAt: Date,
    is_default_password_change: {
      type: Boolean,
      default: false,
    },
    verifiedEmail: {
      type: String,
    },
    email_verify_cooldown: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

export const Customer =
  mongoose.models.Customers || mongoose.model("Customers", CustomerSchema);

// async function removeIsEmailVerifiedField() {
//   try {
//     // Update all documents in the collection to remove the isEmailVerified field
//     const result = await Customer.updateMany(
//       {},
//       { $unset: { isEmailVerified: "" } }
//     );

//     console.log(`$ document(s) updated successfully.`);
//   } catch (error) {
//     console.error("Error occurred while updating documents:", error);
//   }
// }

// // Call the function to remove the field
// removeIsEmailVerifiedField();

// async function updateAllCustomersRole() {
//   try {
//     const result = await Customer.updateMany(
//       {},
//       {
//         $set: {
//           // hash_password:
//           //   "$2b$10$PHWV6W57AkLpFHbeCi3qjOpALTe3EBySFQSzzMt/fWRNjA7NON1OS",

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
