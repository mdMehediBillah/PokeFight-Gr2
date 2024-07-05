import "./AllPoke.css";
import { useState, useEffect } from "react";
import "../HomePage/HomePage.css";
import imgUrl from "../../images/homeBg.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
// import UserProfile from "../../Components/Header/UserProfile";

// import PokeCard from "../../components/PokeCard.jsx";
import Header from "../../Components/Header.jsx";


const AllPoke = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const navigate = useNavigate();
  const [searched, setSearched] = useState(false);
  // const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);
  const homeContainerVarient = {
    hidden: {opacity: 0.6,},
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      x: "100vw",
      transition: { ease: "easeInOut" },
    },
  };

  const titleContainerVarient = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        delay: 0.7,
        duration: 0.5,
      },
    },
  };


  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [description, setDescription] = useState("non defined");
  const [details, setDetails] = useState([]);
      

  const handleSearch = async () => {
    if (!searchInput) return;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`
    );
    console.log("response : ", response);
    const description = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${searchInput.toLowerCase()}`
    );
    console.log("description : ", description);
    setSearched(true);


    if (response.ok && description.ok) {
      const data = await response.json();
      const des = await description.json();
      
      setSearchResult(data);
      setDescription(des);
      


    } else {
      setSearchResult(null);
      console.log("y")
    }
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        // Fetch the initial list of Pokémon
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=30"
        );
        const data = await response.json();
  
        // Extract the URLs from the results
        const pokemonUrls = data.results.map((pokemon) => pokemon.url);
  
        // Fetch the details for each Pokémon
        const pokemonDetailsPromises = pokemonUrls.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setDetails(pokemonDetails);
  
        // Log the details
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };
    fetchPokemonDetails();
  }, []);

  return (
      <motion.div variants={homeContainerVarient} initial="hidden" animate="visible" exit="exit"
      className="main homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
      style={{ backgroundImage: `url(${imgUrl})`,}}>
    {" "}
     <motion.h1
        variants={titleContainerVarient} initial="hidden" animate="visible"
        className="text-center pt-8 text-4xl font-semibold">
        {<Header />}</motion.h1>
      {/* <UserProfile /> */}
      {/* <div className="pokecard">
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
    </div> */}
      <section className="mt-5">
        <div className="flex">
        <input className="hero__glow-cta mr-5" type="text" placeholder="Enter Pokemon name" value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}/>
        <button className="hero__glow-cta" onClick={handleSearch}>
          Search
        </button>
        </div>
        {searched && !searchResult && (<h2>not found</h2>)}
          {searchResult && (
            <div>
             <h2>name : {searchResult.name} </h2>
              <p>descripiton: {description.base_happiness}</p>
              <p>Height: {searchResult.height}</p>
              <p>Weight: {searchResult.weight}</p>
              <img
                src={searchResult.sprites.front_default}
                alt={searchResult.name}
              />
            </div>
          )
          }
      </section>

      <ul>
        {details.map((pokemon) => (
          <li key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            {pokemon.name} - {pokemon.stats[0].stat.name}:{" "}
            {pokemon.stats[0].base_stat}
            {pokemon.stats[1].stat.name}: {pokemon.stats[1].base_stat}
            {pokemon.stats[2].stat.name}: {pokemon.stats[2].base_stat}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AllPoke;
