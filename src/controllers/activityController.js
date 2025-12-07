import Activity from "../models/activityModel.js";

// Create new activity
export const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create({
      userId: req.user._id,
      action: req.body.action,
      details: req.body.details || "",
    });

    res.status(201).json({ success: true, activity });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get only logged-in user’s activities
export const getUserActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({ success: true, activities });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
