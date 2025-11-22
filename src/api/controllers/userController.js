import { userService } from "../services/userService.js";
import { success, error } from "../utils/responseHandler.js";

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

  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const user = await userService.create(userData);

      return res.json(success("Usuário criado com sucesso!", user));
    } catch (err) {
      return res.status(500).json(error("Erro ao crirar usuário!", err));
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
