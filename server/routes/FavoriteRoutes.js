import { Router } from "express";
import { Favorites } from "../models/FavoritesModel.js";

const router = Router();

router.get("/:userId", async (req, res) => {
  try {
    const favorites = await Favorites.find({
      userId: req.params.userId,
    }).populate("resourceId");

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, resourceId } = req.body;

    if (!userId || !resourceId) {
      return res
        .status(400)
        .json({ message: "userId and resourceId are required" });
    }

    const exists = await Favorites.findOne({ userId, resourceId });
    if (exists) {
      return res.status(409).json({ message: "Already added to favorites!" });
    }
    const favorite = new Favorites({ userId, resourceId });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { userId, resourceId } = req.body;
    if (!userId || !resourceId) {
      return res
        .status(400)
        .json({ message: "userId and resourceId are required" });
    }
    const deleted = await Favorites.findOneAndDelete({ userId, resourceId });
    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
