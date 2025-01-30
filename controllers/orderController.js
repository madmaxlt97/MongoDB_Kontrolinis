import mongoose, { Types } from "mongoose";
import orderModel from "../models/orderModel.js";

export async function getAllOrders(req, res) {
  try {
    const orders = await orderModel.find({}, { __v: 0 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getOrderById(req, res) {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invaid ID" });
  }

  try {
    const order = await orderModel.findById(id, { __v: 0 });

    if (!order) {
      return res.status(404).json({ error: "Order not found!" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createNewOrder(req, res) {
  const { userId, product, quantity, status } = req.body;

  const newOrder = new orderModel({
    userId,
    product,
    quantity,
    status,
  });
  const orderResponse = await newOrder.save();

  res.json(orderResponse);
}

export async function updateOrderById(req, res) {
  const { id } = req.params;
  const { userId, product, quantity, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found!" });
    }
    order.userId = userId;
    order.product = product;
    order.quantity = quantity;
    order.status = status;

    await order.save();

    res.json(order);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteOrder(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const deletedOrder = await orderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found!" });
    }

    res.json(deletedOrder);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
