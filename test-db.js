import postgres from "postgres";
import { config } from "dotenv";
config();

async function test() {
  console.log("Connecting to:", process.env.DATABASE_URL);
  try {
    const sql = postgres(process.env.DATABASE_URL);
    const result = await sql`SELECT 1 as result`;
    console.log("Success:", result);
    process.exit(0);
  } catch (err) {
    console.error("Error connecting:", err.message);
    process.exit(1);
  }
}
test();
