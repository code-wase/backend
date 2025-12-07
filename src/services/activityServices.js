import Activity from "../models/activityModel.js";

export const createActivityService = async (userId, data) => {
  return await Activity.create({
    userId,
    action: data.action,
    details: data.details || "",
  });
};

export const getActivityService = async (userId) => {
  return await Activity.find({ userId }).sort({ createdAt: -1 });
};
