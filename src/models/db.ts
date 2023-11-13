import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg";

const pool = new Pool({connectionString: `postgresql://postgres:${process.env.SUPABASE_PASS}@${process.env.SUPABASE_URL}:5432/postgres`})
const db = drizzle(pool)

export default db