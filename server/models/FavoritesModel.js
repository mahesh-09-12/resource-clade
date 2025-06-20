import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resources",
    required: true,
  },
  favoritedAt: { type: Date, default: Date.now() },
});

export const Favorites = mongoose.model("Favorites", FavoriteSchema);
