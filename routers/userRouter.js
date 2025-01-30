import express from "express";
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";

const router = express.Router();

// Get all users
router.get("/users", getAllUsers);
// Get user by ID
router.get("/users/:id", getUserById);
// Create new user
router.post("/users", createNewUser);
// Edit user
router.put("/users/:id", updateUserById);
// Delete user
router.delete("/users/:id", deleteUser);

export default router;
