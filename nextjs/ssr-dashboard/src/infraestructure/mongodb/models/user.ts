import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    role: String,
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
