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
        const pokemonData = response.data;

        setPokemonDetails(pokemonData);
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
      <Link to={`/home`}>
        <p className="back-button">BACK</p>
      </Link>
      <div className="detail-card">
        <div className="detail-header">
          <h2 className="detail-title">{name}</h2>
          <p className="detail-hp">
            HP:{stats.find((stat) => stat.stat.name === "hp").base_stat}
          </p>
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
              <img
                className="detail-image"
                src={sprites.other["official-artwork"].front_default}
                alt={name}
              />
              <p className="detail-order">{order}</p>
            </div>
          </div>
          <p className="detail-description">{description}</p>
        </div>
        <div className="detail-info">
          <p className="detail-type">
            Type: {types.map((type) => type.type.name).join(", ")}
          </p>
          <p>Height: {height / 10} m</p>
          <p>Weight: {weight / 10} kg</p>
          <p>
            Abilities:
            {abilities.map((ability) => ability.ability.name).join(", ")}
          </p>
          <div className="detail-stats">
            <p>
              Attack:
              {stats.find((stat) => stat.stat.name === "attack").base_stat}
            </p>
            <p>
              Defense:
              {stats.find((stat) => stat.stat.name === "defense").base_stat}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
