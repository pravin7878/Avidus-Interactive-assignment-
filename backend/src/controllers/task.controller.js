import Task from "../models/task.model.js"
import User from "../models/user.model.js";
import logActivity from "../utils/ActivityLog.js";

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title,
            description,
            createdBy: req.user.id,
        });

        await logActivity(
            req.user.id,
            "TASK_CREATED",
            `Created task: ${title}`
        );

        res.status(201).json({
            success: true,
            task,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            createdBy: req.user.id,
        }).sort({
            createdAt: -1,
        });

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

export const getSingleTask = async (
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

        if (
            task.createdBy.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateTask = async (
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

        if (
            task.createdBy.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        const updatedTask =
            await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        await logActivity(
            req.user.id,
            "TASK_UPDATED",
            `Updated task: ${updatedTask.title}`
        );

        res.status(200).json({
            success: true,
            task: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteTask = async (
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

        if (
            task.createdBy.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        await Task.findByIdAndDelete(
            req.params.id
        );

        await logActivity(
            req.user.id,
            "TASK_DELETED",
            `Deleted task: ${task.title}`
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