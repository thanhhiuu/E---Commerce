import express from "express";
import { registerUser, login } from "../controller/user.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

export default router;

// CRUD => Create - Read - Update - Delete || Post - Get - Put - Delete
