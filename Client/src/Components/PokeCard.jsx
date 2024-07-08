import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PokeCard.css";
import { motion } from "framer-motion";

import electric from "./../assets/images/pokecard/electric.svg";
import { fetchRandomPokemon } from "../utils/randomPokeUtils";

const PokeCard = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemon = await fetchRandomPokemon();
        setPokemonData(pokemon);
      } catch (error) {
        console.error("Error fetching random pokemon:", error);
      }
    };

    fetchData();
  }, []);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { name, order, image, image2, description, stats, types } = pokemonData;

  const handleFightClick = () => {
    navigate("/gameplay", { state: { selectedPokemon: pokemonData } });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", duration: 0.2, bounce: true }}
      className="pokecard"
    >
      <div className="pokecard-header">
        <h2 className="pokecard-title">{name}</h2>

        <span className="pokecard-hp text-black font-semibold">
          HP: {stats.hp}
        </span>
      </div>
      <Link to={`/allpokes/${pokemonData.id}`}>
        <div className="pokecard-img-container">
          <div className="pokecard-background">
            <img
              src={electric}
              alt="Pokecard background"
              className="pokecard-background_img"
            />
          </div>
          <img className="pokecard-image h-[60%]" src={image2} alt={name} />
          {/* <img className="pokecard-image" src={image} alt={name} /> */}
          <p className="pokecard-order">{order}</p>
          <div className="pokecard-stats">
            <span className="pokecard-attack">Attack: {stats.attack}</span>
            <span className="pokecard-defense">Defense: {stats.defense}</span>
          </div>
        </div>
      </Link>
      <div className="pokecard-body">
        <p className="pokecard-type text-black font-bold">
          Type: {types.map((type) => type.type.name).join(", ")}
        </p>
        <p className=" text-black line-clamp-2 py-6 px-4 text-sm">
          {description}
        </p>
        <div className="pokecard-buttons">
          <Link to={`/allpokes/${pokemonData.id}`}>
            <p className="pokecard-details">DETAILS</p>
          </Link>
          <button className="pokecard-fgt" onClick={handleFightClick}>
            FIGHT
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PokeCard;
