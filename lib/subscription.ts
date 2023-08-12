import Subscription from "@/models/subscriptionModel";
import { auth } from "@clerk/nextjs";
import { connectToDatabase } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  await connectToDatabase();

  const { userId } = auth();
  if (!userId) {
    return false;
  }

  const userSubscription = await Subscription.findOne({ userId });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};
