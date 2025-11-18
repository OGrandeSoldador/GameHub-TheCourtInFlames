import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", userController.getAllUsers);

router.post("/users", userController.createUser);

router.get("/users/:id", userController.getUserById);

export default router;
