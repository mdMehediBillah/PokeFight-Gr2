import ScoreModel from "../../models/scoreModel.js";
import { validationResult } from "express-validator";

//===========================
// get all score
//===========================

export const getAllScore = async (req, res) => {
  try {
    const score = await ScoreModel.find();

    res.status(200).json(score);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//===========================
// Create one score
//===========================

export const createOneScore = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const score = new ScoreModel(req.body);
    const createdScore = await score.save();
    res.status(201).json(createdScore);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
