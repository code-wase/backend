import express from "express";
import { createActivity, getUserActivities } from "../controllers/activityController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", verifyToken, createActivity);
router.get("/user-history", verifyToken, getUserActivities);

export default router;
