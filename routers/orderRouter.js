import express from "express";
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

// Get all orders
router.get("/orders", getAllOrders);
// Get order by ID
router.get("/orders/:id", getOrderById);
// Create new order
router.post("/orders", createNewOrder);
// Edit order
router.put("/orders/:id", updateOrderById);
// Delete order
router.delete("/orders/:id", deleteOrder);

export default router;
