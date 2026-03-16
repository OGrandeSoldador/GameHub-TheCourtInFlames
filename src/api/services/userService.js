import { db, getConnection } from "../../config/db.js";
import sql from "mssql";

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
      [name, email],
    );
    return { id: result.insertId, name: usuario, email };
  },

  async checkUserAvailability(name, email) {
    const pool = await getConnection();
    const request = pool.request();

    request.input("username", sql.NVarChar(100), name);
    request.input("email", sql.NVarChar(200), email);

    const result = await request.query(
      `SELECT 
        username, email 
      FROM 
        Users 
      WHERE 
        username = @username 
      OR 
        email = @email;`,
    );

    if (result.rowsAffected[0] === 0){
      return true;
    }
     
    return false
  },

  async getUser(name, password) {
    const pool = await getConnection();
    const request = pool.request();

    request.input("username", sql.NVarChar(100), name);
    request.input("passwordHash", sql.NVarChar(510), password);

    const result = await request.query(`SELECT id, username, email
      FROM 
        Users
      WHERE 
        username = @username
      AND 
        password_hash = @passwordHash;
`);
    if (result.rowsAffected[0] == 1) {
      return true;
    } else {
      return false;
    }
  },
};
