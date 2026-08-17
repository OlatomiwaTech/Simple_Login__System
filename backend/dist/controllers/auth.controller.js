import prisma from "../lib/prisma.js";
import { hashPassword } from "../utils/password.js";
import { verifyPassword } from "../utils/password.js";
import { createSession } from "../utils/session.js";
import { loginSchema } from "../validators/auth.validator.js";
import { registerSchema } from "../validators/auth.validator.js";
import { deleteSession, } from "../utils/session.js";
export async function register(req, res) {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid registration data",
                errors: result.error.flatten().fieldErrors,
            });
        }
        const { name, email, password } = result.data;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "A user with this email already exists",
            });
        }
        const passwordHash = await hashPassword(password);
        const user = await prisma.user.create({
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
export async function login(req, res) {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid login data",
                errors: result.error.flatten().fieldErrors,
            });
        }
        const { email, password } = result.data;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const passwordIsValid = await verifyPassword(password, user.passwordHash);
        if (!passwordIsValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const sessionId = await createSession(user.id);
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("session_id", sessionId, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
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
export async function logout(req, res) {
    try {
        const sessionId = req.cookies.session_id;
        if (sessionId) {
            await deleteSession(sessionId);
        }
        const isProduction = process.env.NODE_ENV === "production";
        res.clearCookie("session_id", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
        });
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }
    catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
