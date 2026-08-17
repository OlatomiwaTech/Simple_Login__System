import crypto from "node:crypto";
import prisma from "../lib/prisma.js";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
export async function createSession(userId) {
    const sessionId = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await prisma.session.create({
        data: {
            id: sessionId,
            userId,
            expiresAt,
        },
    });
    return sessionId;
}
export async function getSession(sessionId) {
    const session = await prisma.session.findUnique({
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
        await prisma.session.delete({
            where: {
                id: session.id,
            },
        });
        return null;
    }
    return session;
}
export async function deleteSession(sessionId) {
    await prisma.session.deleteMany({
        where: {
            id: sessionId,
        },
    });
}
