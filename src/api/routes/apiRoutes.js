import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();
// lista todos os usuários
router.get("/users", userController.getAllUsers);
// busca 1 usuário no banco de dados com base no "id"
router.get("/users/:id", userController.getUserById);
// verifica se o usuário existe no banco de dados
router.post("/login", userController.verifyUser);
// cria um usuário no banco de dados
router.post("/register", userController.createUser);

export default router;
