import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
const sql = neon(url);
const schema = readFileSync(new URL("../neon-schema.sql", import.meta.url), "utf8");

try {
  await sql.query(schema);
  console.log("Schema applied successfully.");
} catch (err) {
  console.error("Schema apply failed:", err);
  process.exit(1);
}