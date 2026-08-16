"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const password_js_1 = require("../utils/password.js");
const password_js_2 = require("../utils/password.js");
const session_js_1 = require("../utils/session.js");
const auth_validator_js_1 = require("../validators/auth.validator.js");
const auth_validator_js_2 = require("../validators/auth.validator.js");
async function register(req, res) {
    try {
        const result = auth_validator_js_2.registerSchema.safeParse(req.body);
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
async function login(req, res) {
    try {
        const result = auth_validator_js_1.loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid login data",
                errors: result.error.flatten().fieldErrors,
            });
        }
        const { email, password } = result.data;
        const user = await prisma_js_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const passwordIsValid = await (0, password_js_2.verifyPassword)(password, user.passwordHash);
        if (!passwordIsValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const sessionId = await (0, session_js_1.createSession)(user.id);
        res.cookie("session_id", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: "/",
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
