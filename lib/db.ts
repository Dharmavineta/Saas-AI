import mongoose from "mongoose";

const connectToDatabase = async function () {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.log(error);
  }
};

export { connectToDatabase };
