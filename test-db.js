import { getConnection, db } from "./src/config/db.js"

const pool = await getConnection();
async function main() {
  const result = await pool.request().query("SELECT GETDATE() AS dataAtual");
  console.log(result.recordset, 'Teste no banco funcionou!');
}

main();

