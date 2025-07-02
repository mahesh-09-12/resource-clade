process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception! Shutting down...");
  console.error(err);
  process.exit(1);
});

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import ResourceRoutes from "./routes/ResourceRoutes.js";
import FavoriteRoutes from "./routes/FavoriteRoutes.js";
import RatingRoutes from "./routes/RatingRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/resources", ResourceRoutes);
app.use("/api/favorites", FavoriteRoutes);
app.use("/api/rating", RatingRoutes);

const MONGO_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to database..."))
  .catch((error) => console.log(`Error while connecting database ${error}`));

app.listen(PORT, () => {
  console.log(`Server is running...`);
});

process.on("unhandledRejection", (err) => {
  console.error("🛑 Unhandled Promise Rejection! Shutting down...");
  console.error(err);

  server.close(() => {
    process.exit(1);
  });
});
