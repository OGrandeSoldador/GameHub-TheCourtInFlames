import { userService } from "../services/userService.js";
import { success, error } from "../utils/responseHandler.js";
import myJson from "../../../customers.js";
import bcryptData from "../../../hash.js";


export const userController = {
  // -------------------- funções de exemplo para popular um controller  -------------------- \\
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAll();

      return res.json(success("Usuários encontrados", users));
    } catch (err) {
      return res.status(500).json(error("Erro ao buscar todos os usuários", err));
    }
  },

  verifyUser: async (req, res) => {
    try {
      const { usuario, senha } = req.body;

      const userExist = await myJson.findUsername(usuario);
      const resultado = await myJson.findUser(usuario, senha)
      
      if (!userExist) {
        return res.status(401).json(error("Nome de usuário não registrado"));
      }
      
      if (!resultado) {
        return res.status(401).json(error("Usuário ou senha incorretos"));
      }

      return res.json(success("Usuário verificado com sucesso!"));

    } catch (err) {
      return res.status(500).json(error("Erro ao verificar usuário!", err));
    }
  },

  createUser: async (req, res) => {
    const { usuario, email, senha, aceitarTermos } = req.body;

    const userNameFound = await myJson.findUsername(usuario);
    const userEmailFound = await myJson.findEmail(email);

    // verifica se o nome de usuario ja existe
    if (userNameFound) {
      return res.status(400).json(error("Nome de usuário já está em uso!"));
    };
    // verifica se o email ja existe
    if (userEmailFound) {
      return res.status(400).json(error("Email já está em uso!"));
    };

    // as duas condições acima passarem, eu tento:
    try {

      const hashedPassword = await bcryptData.bcryptPassword(senha);

      const newId = await myJson.readJSON() + 1;

      const userData = {
        id: newId,
        usuario,
        email,
        senha: hashedPassword,
        aceitarTermos,
      };

      // const user = await userService.create(userData);

      await myJson.addToJSON(userData);

      return res.json(success("Usuário criado com sucesso!"));
    } catch (err) {
      return res.status(500).json(error("Erro ao criar usuário!", err));
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.getById(req.params.id);

      if (!user) {
        return res.status(404).json(error("Usuário não encontrado"));
      }

      return res.json(success("Usuário encontrado", user));
    } catch (err) {
      return res
        .status(500)
        .json(error("Usuário não encontrado na base de dados!", err));
    }
  },
};
