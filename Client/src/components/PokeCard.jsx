import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PokeCard.css";
import electric from "./../assets/images/pokecard/electric.svg";

const PokeCard = () => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      // Generate a random Pokemon ID between 1 and 898 (inclusive)
      const randomPokemonId = Math.floor(Math.random() * 898) + 1;

      try {
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

        // Create a structured Pokemon object
        const formattedPokemon = {
          id: pokemonData.id,
          name: pokemonData.name,
          order: pokemonData.order,
          stats: {
            hp: pokemonData.stats.find((stat) => stat.stat.name === "hp")
              .base_stat,
            attack: pokemonData.stats.find(
              (stat) => stat.stat.name === "attack"
            ).base_stat,
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

        setPokemonData(formattedPokemon);
      } catch (error) {
        console.error("Error fetching random pokemon:", error);
      }
    };

    fetchRandomPokemon();
  }, []); // Empty dependency array to run useEffect only once on component mount

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { name, order, image, description, stats, types } = pokemonData;

  return (
    <div className="pokecard">
      <div className="pokecard-header">
        <h2 className="pokecard-title">{name}</h2>

        <span className="pokecard-hp">HP: {stats.hp}</span>
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
          <img className="pokecard-image" src={image} alt={name} />
          <p className="pokecard-order">{order}</p>
          <div className="pokecard-stats">
            <span className="pokecard-attack">Attack: {stats.attack}</span>
            <span className="pokecard-defense">Defense: {stats.defense}</span>
          </div>
        </div>
      </Link>
      <div className="pokecard-body">
        <p className="pokecard-type">
          Type: {types.map((type) => type.type.name).join(", ")}
        </p>
        <p className="pokecard-description">{description}</p>
        <div className="pokecard-buttons">
          <Link to={`/allpokes/${pokemonData.id}`}>
            <p className="pokecard-details">DETAILS</p>
          </Link>
          <Link to="/gameplay">
            <p className="pokecard-fight">FIGHT</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
