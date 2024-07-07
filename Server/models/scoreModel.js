import mongoose from "mongoose";

const scoreSchema = mongoose.Schema(
  {
    // poke_user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "PokeUser",
    // },
    user_name: {
      type: String,
      minLength: 2,
      required: true,
    },
    user_pokemon: {
      type: String,
      minLength: 2,
      required: true,
    },
    random_pokemon: {
      type: String,
      minLength: 2,
      required: true,
    },
    user_helth: {
      type: Number,
      required: true,
      default: 0.0,
    },
    computer_helth: {
      type: Number,
      required: true,
      default: 0.0,
    },
    game_winner: {
      type: String,
      minLength: 2,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ScoreModel = mongoose.model("Score", scoreSchema);

export default ScoreModel;
