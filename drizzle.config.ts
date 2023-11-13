import type { Config } from "drizzle-kit";

export default {
    schema: "./src/models/schema.ts",
    out: "./drizzle",
} satisfies Config;