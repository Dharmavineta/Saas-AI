import mongoose, { InferSchemaType } from "mongoose";

const subscriptSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    stripeId: { type: String, unique: true },
    stripeSubscriptionId: { type: String, unique: true },
    stripePriceId: { type: String },
    stripeCurrentPeriodEnd: { type: Date },
  },
  { timestamps: true }
);

type SubscriptionType = InferSchemaType<typeof subscriptSchema>;

const Subscription =
  mongoose.models.subscription ||
  mongoose.model<SubscriptionType>("subscription", subscriptSchema);

export default Subscription;
