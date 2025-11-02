import { getConnection } from "./src/config/db.js"

async function main() {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT GETDATE() AS dataAtual");
  console.log(result.recordset);
}

main();
