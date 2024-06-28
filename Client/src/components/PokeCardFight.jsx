import React from "react";
import "./PokeCardFight.css";
import electric from "./../assets/images/pokecard/electric.jpg";

const PokeCard = () => {
  // Placeholder data
  const name = "Pikachu";
  const image =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"; // Example image
  const type = "Electric";
  const description =
    "Pikachu, an Electric-type Pokémon. It is capable of generating electric shocks of up to 1000 volts.";
  const hp = 35;
  const attack = 55;
  const defense = 40;

  return (
    <div className="pokecard ">
      <div className="pokecard-header">
        <h2 className="pokecard-title">{name}</h2>
        <span className="pokecard-hp">HP: {hp}</span>
      </div>
      <div className="pokecard-img-container">
        <div className="pokecard-background">
          <img
            src={electric}
            alt="Pokecard background"
            className="pokecard-background_img"
          />
        </div>
        <img className="pokecard-image" src={image} alt={name} />
      </div>
      <div className="pokecard-body">
        <p className="pokecard-type">Type: {type}</p>
        <p className="pokecard-description">{description}</p>
        <div className="pokecard-stats">
          <span className="pokecard-attack">Attack: {attack}</span>
          <span className="pokecard-defense">Defense: {defense}</span>
        </div>
        <div className="pokecard-buttons">
          <button className="pokecard-details">CHANGE</button>
          <button className="pokecard-fight">FIGHT</button>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
