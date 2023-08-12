import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

type userModel = InferSchemaType<typeof userSchema>;

const User =
  mongoose.models.user || mongoose.model<userModel>("user", userSchema);

export default User;
