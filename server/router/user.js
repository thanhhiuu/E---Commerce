import express from "express";
import { registerUser } from "../controller/user.js";
const router = express.Router();

router.post("/register", registerUser);

export default router;

// CRUD => Create - Read - Update - Delete || Post - Get - Put - Delete
