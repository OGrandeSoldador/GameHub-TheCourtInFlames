import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", userController.getAllUsers);

router.post("/login", userController.verifyUser);

router.post("/register", userController.createUser);

router.get("/users/:id", userController.getUserById);

export default router;
