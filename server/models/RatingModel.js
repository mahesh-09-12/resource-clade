import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resources",
    required: true,
  },
  rating: Number,
  ratedAt: { type: Date, default: Date.now() },
});

export const Ratings = mongoose.model("Ratings", RatingSchema);
