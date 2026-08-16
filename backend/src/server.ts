import "dotenv/config";
import express from "express";
import prisma from "./lib/prisma.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = 5000;

app.use(express.json());

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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});