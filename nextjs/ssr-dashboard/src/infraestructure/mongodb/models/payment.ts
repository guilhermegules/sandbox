import { Schema, Types, model, models } from "mongoose";

const paymentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Payment = models.Payment || model("Payment", paymentSchema);
