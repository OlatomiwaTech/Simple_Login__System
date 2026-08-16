"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const session_js_1 = require("../utils/session.js");
async function requireAuth(req, res, next) {
    try {
        const sessionId = req.cookies.session_id;
        if (!sessionId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const session = await (0, session_js_1.getSession)(sessionId);
        if (!session) {
            res.clearCookie("session_id", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
            return res.status(401).json({
                success: false,
                message: "Session expired or invalid",
            });
        }
        res.locals.user = session.user;
        res.locals.session = session;
        next();
    }
    catch (error) {
        console.error("Authentication middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Authentication check failed",
        });
    }
}
