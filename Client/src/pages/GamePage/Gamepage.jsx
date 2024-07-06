import { Link, useLocation, useNavigate } from "react-router-dom";

import imgUrl from "../../images/gamePlayBg.jpg";

import { useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";
import axios from "axios";
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
        <div className="pokecard border rounded-lg p-4 mx-4 mb-8 text-center">
          {" "}
          <h2 className="pokecard-title">{selectedPokemon.name}</h2>
          <img
            className="pokecard-image"
            src={selectedPokemon.image}
            alt={selectedPokemon.name}
          />
          <p className="pokecard-stats">HP: {selectedPokemon.stats.hp}</p>
          <p className="pokecard-stats">
            Attack: {selectedPokemon.stats.attack}
          </p>
          <p className="pokecard-stats">
            Defense: {selectedPokemon.stats.defense}
          </p>
          <p className="pokecard-type">
            Type:{" "}
            {selectedPokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <p className="pokecard-description">{selectedPokemon.description}</p>
        </div>
        <div className="vs">VS</div>
        <div className="pokecard">
          <h2 className="pokecard-title">{randomPokemon.name}</h2>
          <img
            className="pokecard-image"
            src={randomPokemon.image}
            alt={randomPokemon.name}
          />
          <p className="pokecard-stats">HP: {randomPokemon.stats.hp}</p>
          <p className="pokecard-stats">Attack: {randomPokemon.stats.attack}</p>
          <p className="pokecard-stats">
            Defense: {randomPokemon.stats.defense}
          </p>
          <p className="pokecard-type">
            Type: {randomPokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <p className="pokecard-description">{randomPokemon.description}</p>
        </div>
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
