import { MAX_FREE_COUNTS } from "@/constants";
import User from "@/models/userModel";
import { auth } from "@clerk/nextjs";
import { connectToDatabase } from "./db";

export const increaseAPILimit = async () => {
  await connectToDatabase();
  const { userId } = auth();
  if (!userId) return;

  const user = await User.findOne({ userId });

  if (user) {
    await User.findByIdAndUpdate(user._id, { $inc: { count: 1 } });
  } else {
    await User.create({ userId, count: 1 });
  }
};

export const checkAPILimit = async () => {
  await connectToDatabase();

  const { userId } = auth();
  if (!userId) return;
  const user = await User.findOne({ userId });

  if (!user || user.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  await connectToDatabase();

  const { userId } = auth();
  if (!userId) {
    return 0;
  }
  const user = await User.findOne({ userId });
  const userApiLimit = user?.count;
  if (!userApiLimit) {
    return 0;
  }
  return Number(userApiLimit);
};
