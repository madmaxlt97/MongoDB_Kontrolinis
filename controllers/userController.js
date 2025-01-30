import userModel from "../models/userModel.js";
import mongoose from "mongoose";

export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find({}, { __v: 0 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invaid ID" });
  }

  try {
    const user = await userModel.findById(id, { __v: 0 });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createNewUser(req, res) {
  const { name, email, age } = req.body;

  const newUser = new userModel({
    name,
    email,
    age,
  });
  const userResponse = await newUser.save();

  res.json(userResponse);
}

export async function updateUserById(req, res) {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    user.name = name;
    user.email = email;
    user.age = age;

    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.json(deletedUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
