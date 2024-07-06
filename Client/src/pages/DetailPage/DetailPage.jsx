import "./DetailPage.css";
import imgUrl from "../../images/homeBg.jpg";
import electric from "../../assets/images/pokecard/electric.svg";
// import bug from "../../assets/images/pokecard/bug.svg";
// import dark from "../../assets/images/pokecard/dark.svg";
// import dragon from "../../assets/images/pokecard/dragon.svg";
// import fairy from "../../assets/images/pokecard/fairy.svg";
// import fighting from "../../assets/images/pokecard/fighting.svg";
// import fire from "../../assets/images/pokecard/fire.svg";
// import flying from "../../assets/images/pokecard/flying.svg";
// import ghost from "../../assets/images/pokecard/ghost.svg";
// import grass from "../../assets/images/pokecard/grass.svg";
// import ground from "../../assets/images/pokecard/ground.svg";
// import ice from "../../assets/images/pokecard/ice.svg";
// import normal from "../../assets/images/pokecard/normal.svg";
// import poison from "../../assets/images/pokecard/poison.svg";
// import psychic from "../../assets/images/pokecard/psychic.svg";
// import rock from "../../assets/images/pokecard/rock.svg";
// import steel from "../../assets/images/pokecard/steel.svg";
// import water from "../../assets/images/pokecard/water.svg";

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./DetailPage.css";

const DetailPage = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonDetails = response.data;

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const speciesData = speciesResponse.data;
        const description = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        ).flavor_text;

        const formattedPokemon = {
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          order: pokemonDetails.order,
          stats: {
            hp: pokemonDetails.stats.find((stat) => stat.stat.name === "hp")
              .base_stat,
            attack: pokemonDetails.stats.find(
              (stat) => stat.stat.name === "attack"
            ).base_stat,
            defense: pokemonDetails.stats.find(
              (stat) => stat.stat.name === "defense"
            ).base_stat,
          },
          abilities: pokemonDetails.abilities,
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          species: pokemonDetails.species.url,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
          types: pokemonDetails.types,
          description: description,
        };

        setPokemonDetails(formattedPokemon);
      } catch (error) {
        console.error("Error fetching pokemon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  const {
    name,
    description,
    height,
    weight,
    order,
    types,
    image,
    abilities,
    stats,
    sprites,
  } = pokemonDetails;

  return (
    <div
      className="homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="detail-card">
        <div className="detail-header">
          <h2 className="detail-title">{name}</h2>
          <p className="detail-hp">HP:{stats.hp}</p>
        </div>
        <div className="detail-container">
          <div className="detail-img-container">
            <div className="detail-background">
              <img
                src={electric}
                alt="Detail Card background"
                className="detail-background_img"
              />
            </div>
            <div>
              <img className="detail-image" src={image} alt={name} />
              <p className="detail-order">{order}</p>
              <div className="detail-stats">
                <p>Attack: {stats.attack}</p>
                <p>Defense: {stats.defense}</p>
              </div>
            </div>
          </div>
          <div className="detail-aside">
            <p className="detail-abilities">Abilities:</p>
            <div className="detail-ab-list">
              <ol>
                {abilities.map((ability) => (
                  <li key={ability.ability.name}> ▪️ {ability.ability.name}</li>
                ))}
              </ol>
            </div>
            <div className="detail-info">
              <p>HEIGHT: {height / 10} m</p>
              <p>WEIGHT: {weight / 10} kg</p>
            </div>
          </div>
        </div>
        <p className="detail-type">
          Type:{types.map((type) => type.type.name).join(", ")}
        </p>
        <p className="detail-description">{description}</p>
        <div className="detail-buttons">
          <Link to="/allpokes">
            <p className="detail-back">BACK TO POKÉDEX</p>
          </Link>
          <Link to="/gameplay" state={{ selectedPokemon: pokemonDetails }}>
            <p className="detail-fgt">FIGHT</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
