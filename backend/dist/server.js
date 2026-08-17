import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./lib/prisma.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
const app = express();
const PORT = Number(process.env.PORT) || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.get("/", (_req, res) => {
    res.json({
        message: "Simple Login System API is running",
    });
});
app.get("/test-db", async (_req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({
            success: true,
            users,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
