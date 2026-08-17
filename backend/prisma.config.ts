import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    // Prisma CLI commands and migrations must use Neon’s direct/unpooled URL.
    // The Express runtime uses DATABASE_URL separately in src/lib/prisma.ts.
    url: env("DIRECT_URL"),
  },
});
