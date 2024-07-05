import { Link, useLocation, useNavigate } from "react-router-dom";

import imgUrl from "../../images/gamePlayBg.jpg";

import { useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";
import axios from "axios";

const Gamepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPokemon = location.state?.selectedPokemon;
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!selectedPokemon) {
      navigate("/home");
      return;
    }

    const fetchRandomPokemon = async () => {
      const randomPokemonId = Math.floor(Math.random() * 898) + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
      );
      const pokemonData = response.data;

      const speciesResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${randomPokemonId}`
      );
      const speciesData = speciesResponse.data;
      const description = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      ).flavor_text;

      const formattedPokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        order: pokemonData.order,
        stats: {
          hp: pokemonData.stats.find((stat) => stat.stat.name === "hp")
            .base_stat,
          attack: pokemonData.stats.find((stat) => stat.stat.name === "attack")
            .base_stat,
          defense: pokemonData.stats.find(
            (stat) => stat.stat.name === "defense"
          ).base_stat,
        },
        abilities: pokemonData.abilities,
        height: pokemonData.height,
        weight: pokemonData.weight,
        species: pokemonData.species.url,
        image: pokemonData.sprites.other["official-artwork"].front_default,
        types: pokemonData.types,
        description: description,
      };

      setRandomPokemon(formattedPokemon);
    };

    fetchRandomPokemon();
  }, [selectedPokemon, navigate]);

  useEffect(() => {
    if (selectedPokemon && randomPokemon) {
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
  }, [selectedPokemon, randomPokemon]);

  if (!selectedPokemon) {
    return null;
  }

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
          <p>Change</p>
        </Link>
        <p>Fight</p>
      </div>
      <div className="flex gap-4 w-72 bg-cyan-50 justify-center mx-auto font-semibold mt-6">
        <Link to="/score">
          <p>Scores</p>
        </Link>
      </div>

      <div className="fight-container flex flex-row items-center pb-8 h-full">
        {" "}
        <div className="pokecard border rounded-lg p-4 mx-4 mb-8 text-center w-72 h-90">
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
        <div className="result">
          <h2>{winner ? `${winner} wins!` : "It's a tie!"}</h2>
        </div>
        <div className="fight-buttons">
          <Link to="/home">
            <button className="btn">Back to Home</button>
          </Link>
          <button className="btn" onClick={() => window.location.reload()}>
            Fight Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gamepage;
