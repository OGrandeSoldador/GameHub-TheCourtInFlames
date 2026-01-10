import { userService } from "../services/userService.js";
import { success, error } from "../utils/responseHandler.js";

export const userController = {
  // -------------------- funções de exemplo para popular um controller  -------------------- \\
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAll();

      return res.status(200).json(success("Usuários encontrados", users));
    } catch (err) {
      return res.status(500).json(error("Erro ao buscar todos os usuários", err));
    }
  },

  verifyUser: async (req, res) => {
    const { nome, senha } = req.body;
    // // lembrar de atualizar as funções para usar o banco de dados

    try {

      const userExist = await userService.verifyUserName(nome);

      if (!userExist) {
        return res.status(401).json(error("Nome de usuário não registrado"));
      }

      const resultado = await userService.loginUser(nome, senha);

      if (!resultado) {
        return res.status(401).json(error("Usuário ou senha incorretos"));
      }
      return res.status(200).json(success("Usuário logado com sucesso", resultado));

    } catch (err) {
      return res.status(500).json(error("Erro ao verificar usuário!", err));
    }
  },

  createUser: async (req, res) => {
    const { nome, email, senha, aceitarTermos } = req.body;

    const userExists = await userService.verifyUserName(nome);
    const emailExists = await userService.verifyEmail(email);

    // verifica se o nome de usuario ja existe
    if (userExists) {
      return res.status(400).json(error("Nome de usuário já está em uso!"));
    };
    // verifica se o email ja existe
    if (emailExists) {
      return res.status(400).json(error("Este email já está cadastrado!"));
    };
    // as duas condições acima passarem, eu tento:
    try {
      const userData = {
        nome,
        email,
        senha,
        aceitarTermos,
      };

      await userService.create(userData);

      return res.status(201).json(success("Usuário criado com sucesso!"));
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
