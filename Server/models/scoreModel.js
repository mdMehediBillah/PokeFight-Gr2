import mongoose from "mongoose";

const scoreSchema = mongoose.Schema(
  {
    poke_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "PokeUser",
    },
    user_score: {
      type: Number,
      required: true,
      default: 0.0,
    },
    computer_score: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

const ScoreModel = mongoose.model("Score", scoreSchema);

export default ScoreModel;
