import express from "express";
import { createActivity, getActivities } from "../controllers/activityController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", verifyToken, createActivity);
router.get("/user-history", verifyToken, getActivities);

export default router;
