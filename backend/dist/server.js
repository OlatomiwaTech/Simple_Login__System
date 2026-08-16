"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const prisma_js_1 = __importDefault(require("./lib/prisma.js"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({
        message: "Simple Login System API is running",
    });
});
app.get("/test-db", async (_req, res) => {
    try {
        const users = await prisma_js_1.default.user.findMany();
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
app.use("/api/auth", auth_routes_js_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
