import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import ActivityLog from "../models/activity.model.js";
import logActivity from "../utils/ActivityLog.js";

export const getAllUsers = async (
    req,
    res
) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteUser = async (
    req,
    res
) => {
    try {
        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await User.findByIdAndDelete(
            req.params.id
        );

        await logActivity(
            req.user.id,
            "USER_DELETED",
            `Deleted user ${user.email}`
        );

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateUserStatus = async (
    req,
    res
) => {
    try {
        const { status } = req.body;

        if (
            !["active", "inactive"].includes(
                status
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const user =
            await User.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await logActivity(
            req.user.id,
            "USER_STATUS_UPDATED",
            `${user.email} set to ${status}`
        );

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getAllTasks = async (
    req,
    res
) => {
    try {
        const tasks = await Task.find()
            .populate(
                "createdBy",
                "name email role"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteAnyTask = async (
    req,
    res
) => {
    try {
        const task = await Task.findById(
            req.params.id
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await Task.findByIdAndDelete(
            req.params.id
        );

        await logActivity(
            req.user.id,
            "ADMIN_TASK_DELETE",
            `Deleted task ${task.title}`
        );

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getActivityLogs = async (
    req,
    res
) => {
    try {
        const logs =
            await ActivityLog.find()
                .populate(
                    "user",
                    "name email role"
                )
                .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            logs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getAnalytics = async (
    req,
    res
) => {
    try {
        const totalUsers =
            await User.countDocuments();

        const totalTasks =
            await Task.countDocuments();

        const completedTasks =
            await Task.countDocuments({
                status: "completed",
            });

        const pendingTasks =
            await Task.countDocuments({
                status: "pending",
            });

        res.status(200).json({
            success: true,
            analytics: {
                totalUsers,
                totalTasks,
                completedTasks,
                pendingTasks,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};