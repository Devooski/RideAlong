require("dotenv").config();
const pool = require("../src/db/pool");
async function main(){ const r = await pool.query("SELECT NOW() AS current_time"); console.log("Database connected:", r.rows[0].current_time); await pool.end(); }
main().catch(err => { console.error("Database check failed:", err.message); process.exit(1); });
