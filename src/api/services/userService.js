import { db } from "../../config/db.js";

//mudar para prisma ou typeorm
export const userService = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { name, email } = data;
    const [result] = await db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    return { id: result.insertId, name, email };
  },
};
