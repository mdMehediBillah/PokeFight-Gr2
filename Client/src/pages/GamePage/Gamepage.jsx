import { Link, useLocation, useNavigate } from "react-router-dom";
import imgUrl from "../../images/gamePlayBg.jpg";
import electric from "../../assets/images/pokecard/electric.svg";
import PokeFight from "../../assets/pokeFight.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import vs from "../../assets/vs.svg";
import { fetchRandomPokemon } from "../../utils/randomPokeUtils";

const Gamepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPokemon = location.state?.selectedPokemon;
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showResult, setShowResult] = useState(false);

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

  useEffect(() => {
    if (selectedPokemon && randomPokemon && showResult) {
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
        } else if (selectedTotal < randomTotal) {
          setWinner(randomPokemon.name);
        } else {
          setWinner("It's a tie!");
        }
      };

      determineWinner();
    }
  }, [selectedPokemon, randomPokemon, showResult]);

  const saveResult = () => {
    const fightResult = {
      selectedPokemon: selectedPokemon.name,
      randomPokemon: randomPokemon.name,
      winner: winner,
      date: new Date().toLocaleString(),
    };

    const existingResults =
      JSON.parse(localStorage.getItem("fightResults")) || [];
    existingResults.push(fightResult);
    localStorage.setItem("fightResults", JSON.stringify(existingResults));
    alert("Fight result saved!");
  };

  // if (!selectedPokemon) {
  //   return null;
  // }

  if (!randomPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <h1 className="text-center bg-cyan-50 pt-8 text-4xl font-semibold">
        {" "}
        Fight with Pokemon
      </h1>
      <div className="flex gap-4 w-72 bg-cyan-50 justify-center mx-auto font-semibold mt-6">
        <Link to="/home">
          <p>Change Pokemon</p>
        </Link>
        {/* <p>Fight</p> */}
      </div>
      <div className="flex gap-4 w-72 bg-cyan-50 justify-center mx-auto font-semibold mt-6">
        <Link to="/score">
          <p>Scores</p>
        </Link>
      </div>

      <div className="fight-container flex flex-row items-center">
        {" "}

        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", duration: 0.2, bounce: true }}
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
              src={selectedPokemon.image}
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
            <p className="text-black line-clamp-2 px-4 py-6 text-sm">
              {selectedPokemon.description}
            </p>
            <div className="pokecard-buttons">
              <Link to={`/allpokes`}>
                <p className="pokecard-details">BACK</p>
              </Link>

              <p
                onClick={() => window.location.reload()}
                className="pokecard-fgt"
              >
                FIGHT AGAIN
              </p>
            </div>
          </div>
        </motion.div>
        <img src={vs} alt="VS" className="w-[150px] px-4" />
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", duration: 0.2, bounce: true }}
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
              src={randomPokemon.image}
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
      <div className="fight-button-container text-center mt-4">
        <button
          className="fight-button bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowResult(true)}
        >
          FIGHT
        </button>
      </div>

      {showResult && (
        <div className="result text-center text-white px-4 py-2 mt-4">
          <h2>{winner ? `${winner} wins!` : "It's a tie!"}</h2>

          <button
            className="save-button bg-green-500 text-white px-4 py-2 rounded mt-4"
            onClick={saveResult}
          >
            Save Result
          </button>
        </div>
      )}
    </div>
  );
};

export default Gamepage;
