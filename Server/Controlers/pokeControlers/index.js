import UserModel from "../../models/pokeUserModel.js";
import { validationResult } from "express-validator";
// import { postErrorValidator } from "../../Middleware/PokeUser/index.js";

//===========================
// get all user and query by name and type
//===========================

export const getAll = async (req, res) => {
  try {
    const pokeUser = await UserModel.find();

    res.status(200).json(pokeUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//===========================
// Create one single user
//===========================

export const createOne = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = new UserModel(req.body);
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//===========================
// Get one single user
//===========================

export const getOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//===========================
// Update one single user
//===========================

export const updateOne = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//===========================
// Delete One
//===========================

export const deletOne = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
