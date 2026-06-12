import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import {
    getAllUsers,
    deleteUser,
    updateUserStatus,
    getAllTasks,
    deleteAnyTask,
    getActivityLogs,
    getAnalytics,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Apply to all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/status", updateUserStatus);

// Tasks
router.get("/tasks", getAllTasks);
router.delete("/tasks/:id", deleteAnyTask);

// Logs
router.get("/logs", getActivityLogs);

// Analytics
router.get("/analytics", getAnalytics);

export default router;