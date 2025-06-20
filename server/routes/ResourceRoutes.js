import { Router } from "express";
import { Resources } from "../models/ResourcesModel.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const resources = await Resources.find();
    res.json(resources);
  } catch (error) {
    res
      .status(500)
      .json({ message: "No resources found", error: error.message });
  }
});

router.post("/", async (req, res) => {
  const resource = req.body;
  try {
    const newResource = await Resources.create(resource);
    res.status(201).json({ message: "Resource added", resource: newResource });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add resource", error: error.message });
  }
});

export default router;
