
import express from 'express';
import { getAllUsers, login, profile, register } from '../controllers/userController.js';
import upload from '../middlewares/upload.js';
import authMiddlware from '../middlewares/authMiddleware.js'

const router = express.Router();

// Routes

// Register Route
router.post("/register", upload.single("avatar"), register);

// Login Route
router.post("/login", login);

// Profile Route
router.get("/me", authMiddlware, profile);

// Get all the user Route
router.get("/users", getAllUsers);



export default router;














