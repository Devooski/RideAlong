const { Pool } = require("pg");
if (!process.env.DATABASE_URL) console.warn("DATABASE_URL is not set. Database queries will fail until configured.");
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false });
module.exports = pool;
