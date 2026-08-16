"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.getSession = getSession;
exports.deleteSession = deleteSession;
const node_crypto_1 = __importDefault(require("node:crypto"));
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
async function createSession(userId) {
    const sessionId = node_crypto_1.default.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await prisma_js_1.default.session.create({
        data: {
            id: sessionId,
            userId,
            expiresAt,
        },
    });
    return sessionId;
}
async function getSession(sessionId) {
    const session = await prisma_js_1.default.session.findUnique({
        where: {
            id: sessionId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    if (!session) {
        return null;
    }
    if (session.expiresAt <= new Date()) {
        await prisma_js_1.default.session.delete({
            where: {
                id: session.id,
            },
        });
        return null;
    }
    return session;
}
async function deleteSession(sessionId) {
    await prisma_js_1.default.session.deleteMany({
        where: {
            id: sessionId,
        },
    });
}
