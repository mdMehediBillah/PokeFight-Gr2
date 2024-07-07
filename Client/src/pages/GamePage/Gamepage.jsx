import { Link, useLocation, useNavigate } from "react-router-dom";
import imgUrl from "../../images/gamePlayBg.jpg";
import electric from "../../assets/images/pokecard/electric.svg";
import PokeFight from "../../assets/pokeFight.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import vs from "../../assets/vs.svg";
import { fetchRandomPokemon } from "../../utils/randomPokeUtils";
import SuccessModal from "../../Components/SuccessModal";
import LoseModal from "../../Components/LoseModal";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineLeaderboard } from "react-icons/md";
import Footer from "../../Components/Footer";
import UserProfile from "../../Components/Header/UserProfile";

const Gamepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  // const [openModal, setOpenModal] = useState(false);
  const [showModal, setShowModal] = useState(null);

  const selectedPokemon = location.state?.selectedPokemon;

  useEffect(() => {
    if (!selectedPokemon) {
      navigate("/home");
      return;
    }

    const fetchData = async () => {
      const pokemon = await fetchRandomPokemon();
      setRandomPokemon(pokemon);
    };
    fetchData();
  }, [selectedPokemon, navigate]);

  // Determine winner
  const determineWinner = () => {
    const selectedTotal =
      selectedPokemon.stats.hp +
      selectedPokemon.stats.attack +
      selectedPokemon.stats.defense;
    const randomTotal =
      randomPokemon.stats.hp +
      randomPokemon.stats.attack +
      randomPokemon.stats.defense;

    if (selectedTotal > randomTotal) {
      setWinner(selectedPokemon.name);
      setUserScore((prevScore) => prevScore + 1);
      localStorage.setItem("userScore", JSON.stringify(userScore));
    } else if (selectedTotal < randomTotal) {
      setWinner(randomPokemon.name);
      setComputerScore((prevScore) => prevScore + 1);
      localStorage.setItem("computerScore", JSON.stringify(computerScore));
    } else {
      setWinner("It's a tie!");
    }
  };
  // Show result
  useEffect(() => {
    if (selectedPokemon && randomPokemon && showResult) {
      determineWinner();
    }
  }, [selectedPokemon, randomPokemon, showResult]);

  // Save result
  const saveResult = () => {
    const fightResult = {
      selectedPokemon: selectedPokemon.name,
      randomPokemon: randomPokemon.name,
      winner: winner,
      date: new Date().toLocaleString(),
    };
    // Check existing results in local storage
    const existingResults =
      JSON.parse(localStorage.getItem("fightResults")) || [];
    existingResults.push(fightResult);
    localStorage.setItem("fightResults", JSON.stringify(existingResults));
    toast.success("Fight result saved successfully!");
    // alert("Fight result saved!");
  };

  if (!randomPokemon) {
    return <div>Loading...</div>;
  }

  const winnerPokemon = winner;
  const userSelectPokemon = selectedPokemon.name;
  console.log(winnerPokemon);
  console.log(userSelectPokemon);

  const handleCheckWinner = () => {
    determineWinner();
    if (winnerPokemon === userSelectPokemon) {
      setShowModal("success");
      setShowResult(true);
    } else {
      setShowModal("fail");
      setShowResult(true);
    }
  };

  const userScoreLocal = localStorage.getItem("userScore");
  const computerScoreLocal = localStorage.getItem("computerScore");

  const showAllVarient = {
    hidde: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 1.2,
        duration: 0.5,
      },
    },
  };

  return (
    <div
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="flex container justify-between mx-auto px-8 py-4">
        <UserProfile />
        <Link to="/home">
          <motion.h2
            variants={showAllVarient}
            initial="hidde"
            animate="visible"
            className="home-pokedex-btn"
          >
            Home
          </motion.h2>{" "}
        </Link>
      </div>
      <Link to={"/home"}>
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.3, delay: 1.3 }}
          className=""
        >
          <img
            src={PokeFight}
            alt="Pokefight logo"
            className="w-[350px] justify-center"
          />
        </motion.div>
        {/* modal */}
      </Link>
      {showModal === "success" && (
        <SuccessModal
          closeModal={setShowModal}
          selectedPokemon={selectedPokemon}
          randomPokemon={randomPokemon}
          userScore={setUserScore}
          computerScore={setComputerScore}
        />
      )}
      {showModal === "fail" && (
        <LoseModal
          closeModal={setShowModal}
          selectedPokemon={selectedPokemon}
          randomPokemon={randomPokemon}
          userScore={setUserScore}
          computerScore={setComputerScore}
        />
      )}

      <div className="flex container justify-center mb-20 gap-4">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.3, delay: 1 }}
          className="bg-cyan-200 py-2 px-4 text-black font-semibold rounded hover:bg-yellow-400"
        >
          <Link to="/allPokes" className="flex items-center gap-2">
            <FaArrowLeft />
            <p>Change Pokemon</p>
          </Link>
          {/* <p>Fight</p> */}
        </motion.div>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.3, delay: 1.5 }}
          className="bg-cyan-200 py-2 px-4 text-black font-semibold rounded hover:bg-yellow-400"
        >
          <Link to="/score" className="flex items-center gap-2">
            <MdOutlineLeaderboard />
            <p>Players Statistics</p>
          </Link>
        </motion.div>
      </div>

      <div className="fight-container flex flex-row items-center">
        {" "}
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.5, delay: 0.8 }}
          className="pokecard"
        >
          <div className="pokecard-header">
            <h2 className="pokecard-title">{selectedPokemon.name}</h2>
            <p className="pokecard-hp text-black font-semibold">
              HP: {selectedPokemon.stats.hp}
            </p>
          </div>
          <div className="pokecard-img-container">
            <div className="pokecard-background">
              <img
                src={electric}
                alt="Pokecard background"
                className="pokecard-background_img"
              />
            </div>
            <img
              className="pokecard-image w-auto h-[70%]"
              src={selectedPokemon.image2}
              alt={selectedPokemon.name}
            />
            <p className="pokecard-order">{selectedPokemon.order}</p>
            <div className="pokecard-stats">
              <span className="pokecard-attack">
                Attack: {selectedPokemon.stats.attack}
              </span>
              <span className="pokecard-defense">
                Defense: {selectedPokemon.stats.defense}
              </span>
            </div>
          </div>

          <div className="pokecard-body">
            <p className="pokecard-type text-black font-bold">
              Type:{" "}
              {selectedPokemon.types.map((type) => type.type.name).join(", ")}
            </p>
            <p className="text-black px-4 py-6 text-sm">
              {selectedPokemon.description}
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            bounce: 100,
            duration: 0.2,
            delay: 0.2,
          }}
        >
          <img src={vs} alt="VS" className="w-[150px] px-4" />
        </motion.div>
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.5, delay: 0.5 }}
          className="pokecard"
        >
          <div className="pokecard-header">
            <h2 className="pokecard-title">{randomPokemon.name}</h2>
            <p className="pokecard-hp text-black font-semibold">
              HP: {randomPokemon.stats.hp}
            </p>
          </div>
          <div className="pokecard-img-container">
            <div className="pokecard-background">
              <img
                src={electric}
                alt="Pokecard background"
                className="pokecard-background_img"
              />
            </div>
            <img
              className="pokecard-image w-auto h-[70%]"
              src={randomPokemon.image2}
              alt={randomPokemon.name}
            />
            <p className="pokecard-order">{randomPokemon.order}</p>
            <div className="pokecard-stats">
              <span className="pokecard-attack">
                Attack: {randomPokemon.stats.attack}
              </span>
              <span className="pokecard-defense">
                Defense: {randomPokemon.stats.defense}
              </span>
            </div>
          </div>

          <div className="pokecard-body">
            <p className="pokecard-type text-black font-bold">
              Type:{" "}
              {randomPokemon.types.map((type) => type.type.name).join(", ")}
            </p>
            <p className="text-black px-4 py-6 text-sm">
              {randomPokemon.description}
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.3, delay: 1.2 }}
        className="fight-button-container text-center mt-4 flex gap-10 items-center mx-auto"
      >
        <h2 className=" w-[200px] bg-cyan-800 py-1 px-4 text-white rounded mr-4">
          User score: {userScoreLocal}{" "}
        </h2>
        <button
          className=" pokecard-fgt"
          onClick={handleCheckWinner}
          // onClick={() => setShowResult(true)}
        >
          FIGHT
        </button>
        <h2 className="w-[200px] bg-cyan-800 py-1 px-4 text-white rounded ml-4">
          Computer score: {computerScoreLocal}{" "}
        </h2>
      </motion.div>

      {showResult && (
        <div className=" text-center text-white px-4 py-2 mt-6">
          <h2 className="text-red bg-rose-600 font-bold text-2xl py-2 px-6 rounded-xl">
            {winner ? `The winner is ${winner}!` : "It's a tie!"}
          </h2>

          <button
            className="save-button bg-cyan-500 text-white px-4 py-2 rounded mt-2 mb-10"
            onClick={saveResult}
          >
            Save Result
          </button>
        </div>
      )}
      <div className="my-auto pt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Gamepage;
