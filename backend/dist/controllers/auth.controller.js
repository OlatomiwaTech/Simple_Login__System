"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const password_js_1 = require("../utils/password.js");
const auth_validator_js_1 = require("../validators/auth.validator.js");
async function register(req, res) {
    try {
        const result = auth_validator_js_1.registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid registration data",
                errors: result.error.flatten().fieldErrors,
            });
        }
        const { name, email, password } = result.data;
        const existingUser = await prisma_js_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "A user with this email already exists",
            });
        }
        const passwordHash = await (0, password_js_1.hashPassword)(password);
        const user = await prisma_js_1.default.user.create({
            data: {
                name,
                email,
                passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user,
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
