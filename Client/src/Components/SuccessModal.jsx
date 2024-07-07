import "./SuccessModal.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { URL } from "../utils/myLocalURL.js";

const SuccessModal = ({
  closeModal,
  selectedPokemon,
  randomPokemon,
  userScore,
  computerScore,
}) => {
  const navigate = useNavigate();

  // getting user name from local storage
  const userName = localStorage.getItem("userName");

  const handleCloseModal = () => {
    closeModal(null);
  };
  const handlePlayAgain = () => {
    closeModal(null);
    navigate("/home");
  };

  // updating user score
  const selectedTotal =
    selectedPokemon.stats.hp +
    selectedPokemon.stats.attack +
    selectedPokemon.stats.defense;
  const randomTotal =
    randomPokemon.stats.hp +
    randomPokemon.stats.attack +
    randomPokemon.stats.defense;
  console.log(selectedTotal, randomTotal);
  const winner = selectedTotal > randomTotal ? userName : "Computer";

  // saving data to database
  const saveTodatabase = async () => {
    try {
      const newScore = {
        user_name: userName,
        user_pokemon: selectedPokemon.name,
        random_pokemon: randomPokemon.name,
        user_helth: selectedTotal,
        computer_helth: randomTotal,
        game_winner: winner,
      };
      const { data } = await axios.post(`${URL}/scores`, newScore);
      console.log(data);
      closeModal(null);
      toast.success("Score save successfully!");
      navigate("/score");
    } catch (error) {
      console.error("Error saving data to database:", error);
    }
  };

  return (
    <div className="modalBg">
      <motion.div
        initial={{ scale: 0, opacity: 0, rotateX: 180, x: "-100vw" }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, x: 0 }}
        transition={{ type: "spring", duration: 0.2, bounce: 20 }}
        className="modalContainer"
      >
        <div className="titleCloseBtn">
          <button onClick={handleCloseModal}> X </button>
        </div>
        <div>
          <img
            className="modalImage"
            src={selectedPokemon.image2}
            alt={selectedPokemon.name}
          />
          <h2 className="text-center text-3xl font-semibold mt-6  py-2 text-black">
            Congratulation! {userName}
          </h2>
        </div>
        <div>
          <p className="text-center mt-2 text-black text-xl">
            Your Pokemon <strong>{selectedPokemon.name}</strong> wins
          </p>
        </div>
        <div className="flex mt-6 justify-between gap-4 mt-16">
          <button
            className=" bg-orange-300 hover:bg-orange-200 text-black font-semibold py-2 rounded w-full"
            onClick={handlePlayAgain}
          >
            Play again
          </button>
          <button
            className=" bg-cyan-400 hover:bg-cyan-200 text-black font-semibold py-2 rounded w-full"
            onClick={saveTodatabase}
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
