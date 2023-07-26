import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB  from "./config/database";

import authRoutes from "./routers/authRoutes";
import productRoutes from "./routers/productRouters";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Connect to MongoDB
app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.log("Cannot connect to the database");
  }
});
