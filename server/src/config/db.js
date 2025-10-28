import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const connectDB = async () => {
  console.log("connecting to database...");
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Sucessfully connected to database");
    })
    .catch((err) => {
      throw new AppError(500, `Failed to connect to database: \n ${err}`);
    });
};

export default connectDB;
