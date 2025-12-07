import {
  createActivityService,
  getActivityService,
} from "../services/activityServices.js";

export const createActivity = async (req, res) => {
  try {
    const activity = await createActivityService(req.user.id, req.body);
    res.status(201).json({ success: true, activity });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await getActivityService(req.user.id);
    res.status(200).json({ success: true, activities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
