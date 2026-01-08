import { getConnection } from "../../config/db.js";
import bcryptData from "../../../hash.js";

const connection = await getConnection()
//mudar para prisma ou typeorm
export const userService = {
  async getAll() {
    const data = await connection.query("SELECT * FROM users");
    return data.recordset;
  },

  async getById(id) {
    const data = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
    if (data.recordset[0] == "") {
      return;
    }
    return data.recordset[0];
  },

  async create(data) {

    const { nome, email, senha, aceitarTermos } = data;

    const hashedPassword = await bcryptData.bcryptPassword(senha);

    const request = connection.request();
    request.input('nomeParam', nome);
    request.input('emailParam', email);
    request.input('senhaParam', hashedPassword);
    request.input('aceitarTermosParam', aceitarTermos);

    const insertQuery = `
    INSERT INTO users (usuario, email, senha, aceitar_termos)
    OUTPUT INSERTED.id, INSERTED.usuario, INSERTED.email, INSERTED.aceitar_termos
    VALUES (@nomeParam, @emailParam, @senhaParam, @aceitarTermosParam);`;
    
    const result = await request.query(insertQuery);
    return result.recordset[0];
  },

  async verifyUserName(nome) {
    const request = connection.request();
    request.input('nomeParam', nome);
    const data = await request.query("SELECT usuario FROM users WHERE usuario = @nomeParam");
    return data.recordset.length > 0;
  },

  async verifyEmail(email) {
    const request = connection.request();
    request.input('emailParam', email);
    const result = await request.query("SELECT email FROM users WHERE email = @emailParam");
    return result.recordset.length > 0;
  },

  async loginUser(nome, senha) {

    const request = connection.request();

    request.input('nomeParam', nome);

    const result = await request.query("SELECT id, usuario, email, senha, aceitar_termos FROM users WHERE usuario = @nomeParam");

    if (result.recordset.length === 0) {
      return null;
    }

    const user = result.recordset[0];

    const passwordMatch = await bcryptData.comparePassword(senha, user.senha);
    if (passwordMatch) {
      const {senha, ...userWithoutPassword} = user;
      return userWithoutPassword;
    };
  }
};
