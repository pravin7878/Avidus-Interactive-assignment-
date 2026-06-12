import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask,
    getSingleTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, getMyTasks);

router.get("/:id", authMiddleware, getSingleTask);

router.patch("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

export default router;