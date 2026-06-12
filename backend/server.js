import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectToDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Server",
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

// 404 Route
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// Start Server
const startServer = async () => {
    try {
        await connectToDB();

        console.log("✅ Database Connected Successfully");

        app.listen(port, () => {
            console.log(
                `🚀 Server running on http://localhost:${port}`
            );
        });
    } catch (error) {
        console.error(
            "❌ Database Connection Failed:",
            error.message
        );
        process.exit(1);
    }
};

startServer();