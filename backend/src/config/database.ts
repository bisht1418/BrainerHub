import mongoose from "mongoose";
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://bishtnrj1418:neeraj@cluster0.oip0pu3.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to the database");
  } catch (error:any) {
    console.error("Error connecting to the database:", error.message);
  }
};

export default connectDB;
