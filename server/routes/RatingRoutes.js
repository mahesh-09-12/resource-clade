import { Router } from "express";
import { Ratings } from "../models/RatingModel.js";
import { Resources } from "../models/ResourcesModel.js";

const router = Router();

router.get("/:userId/:resourceId", async (req, res) => {
  try {
    const { userId, resourceId } = req.params;
    const rating = await Ratings.findOne({ userId, resourceId });
    if (!rating) return res.json({ message: "Not rated" });
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.patch("/:resourceId", async (req, res) => {
  try {
    const { resourceId } = req.params;
    const { userId, rating } = req.body;

    if (!rating)
      return res.status(400).json({ error: "Rating must be between 1 to 5." });

    const domain = await Resources.findById(resourceId);

    if (!domain) return res.json({ message: "Domain not found." });

    let existingRating = await Ratings.findOne({ userId, resourceId });
    const isNew = !existingRating;
    if (existingRating) {
      domain.ratingSum -= existingRating.rating;
      existingRating.rating = rating;
      domain.ratingSum += rating;
    } else {
      existingRating = new Ratings({ userId, resourceId, rating });
      domain.ratingSum += rating;
      domain.totalRatings += 1;
    }

    domain.rating = domain.ratingSum / domain.totalRatings;
    await domain.save();

    await existingRating.save();

    res.status(200).json({
      message: isNew ? "Rated successfully" : "Rating updated",
      averageRating: domain.rating.toFixed(2),
      totalRatings: domain.totalRatings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
