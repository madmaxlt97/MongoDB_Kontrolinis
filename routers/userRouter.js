import express from "express";
import {
  createNewUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

// Get all users
router.get("/users", getAllUsers);
// Get user by ID
router.get("/users/:id", getUserById);
// Create new user
router.post("/users", createNewUser);
// Edit user
router.put("/users/:id");
// Delete user
router.delete("/users/:id");

export default router;
