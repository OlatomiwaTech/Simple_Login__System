import argon2 from "argon2";
export async function hashPassword(password) {
    return argon2.hash(password);
}
export async function verifyPassword(password, passwordHash) {
    return argon2.verify(passwordHash, password);
}
