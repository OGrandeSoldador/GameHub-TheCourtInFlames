import { db, getConnection } from "../../config/db.js";

const connection = await getConnection()
//mudar para prisma ou typeorm
export const userService = {
  async getAll() {
    const data = await connection.query("SELECT * FROM users");
    return data.recordset;
  },

  async getById(id) {
    const data = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    return data.recordset || null;
  },

  async create(data) {
    const { name, email } = data;
    const [result] = await db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    return { id: result.insertId, name: usuario, email };
  },
};
