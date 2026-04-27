const fs = require("fs/promises");
const path = require("path");
const pool = require("../db");

async function initDb() {
  const sqlPath = path.join(__dirname, "..", "db", "init.sql");
  const sql = await fs.readFile(sqlPath, "utf8");
  await pool.query(sql);
  console.log("PostgreSQL schema initialized.");
}

initDb()
  .catch((error) => {
    console.error("Failed to initialize database:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
