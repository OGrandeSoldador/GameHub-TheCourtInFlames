import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", userController.getAllUsers);

router.get("/users/:id", userController.getUserById);

router.post("/users", userController.createUser);

export default router;
