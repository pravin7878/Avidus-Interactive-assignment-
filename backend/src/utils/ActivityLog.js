import ActivityLog from "../models/activity.model.js";

const logActivity = async (
    userId,
    action,
    details = ""
) => {
    await ActivityLog.create({
        user: userId,
        action,
        details,
    });
};

export default logActivity;