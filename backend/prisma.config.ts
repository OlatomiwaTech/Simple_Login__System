import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// A local PostgreSQL URL is already a direct connection. In production, set
// DIRECT_URL explicitly to Neon’s direct/unpooled connection string.
const migrationUrl =
  process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? env("DIRECT_URL");

if (new URL(migrationUrl).hostname.includes("-pooler")) {
  throw new Error(
    "DIRECT_URL must be set to Neon’s direct/unpooled connection string before running Prisma migrations.",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    // Prisma CLI commands and migrations must use Neon’s direct/unpooled URL.
    // The Express runtime uses DATABASE_URL separately in src/lib/prisma.ts.
    url: migrationUrl,
  },
});
