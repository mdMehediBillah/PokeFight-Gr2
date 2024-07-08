import "./DetailPage.css";
import imgUrl from "../../images/homeBg.jpg";
import electric from "../../assets/images/pokecard/electric.svg";
import { motion } from "framer-motion";

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./DetailPage.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import UserProfile from "../../Components/Header/UserProfile";

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
        console.log(pokemonDetails.sprites.other["showdown"].front_default);

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
          image2: pokemonDetails.sprites.other["showdown"].front_default,
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
    image2,
    abilities,
    stats,
    sprites,
  } = pokemonDetails;

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
    <>
      <div
        className="homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
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

        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
          className=""
        >
          <Header />
        </motion.div>
        <motion.h1
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.6 }}
          className="text-black text-2xl mb-2"
        >
          Details about Pokemon
        </motion.h1>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.8 }}
          className="detail-card m-auto"
        >
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
                <img className="detail-image h-[60%]" src={image2} alt={name} />
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
                    <li key={ability.ability.name}>
                      {" "}
                      ▪️ {ability.ability.name}
                    </li>
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
          <div className="flex w-full justify-center gap-2">
            <Link to="/allpokes">
              <p className="detail-back w-full">BACK TO POKÉDEX</p>
            </Link>
            <Link to="/gameplay" state={{ selectedPokemon: pokemonDetails }}>
              <p className="detail-fgt w-full">FIGHT</p>
            </Link>
          </div>
        </motion.div>
        <Footer />
      </div>
    </>
  );
};

export default DetailPage;
