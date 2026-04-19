import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

export const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST || "mssql",
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool;

export async function getConnection() {
  try {
    if (pool) return pool;
    pool = await sql.connect(db);
    console.log("🟢 Conectado ao SQL Server com sucesso!");
    return pool;
  } catch (err) {
    console.error("❌ Erro ao conectar ao SQL Server:", err.message);
    throw err;
  }
}
