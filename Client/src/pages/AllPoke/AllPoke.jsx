import "./AllPoke.css";
import { useState, useEffect } from "react";
import "../HomePage/HomePage.css";
import imgUrl from "../../images/homeBg.jpg";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import electric from "../../assets/images/pokecard/electric.svg";
// import axios from "axios";
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
    hidden: { opacity: 0.6 },
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
  // const [descript, setDescription] = useState("non defined");
  const [details, setDetails] = useState([]);

  const handleSearch = async () => {
    if (!searchInput) return;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`
    );
    const description = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${searchInput.toLowerCase()}`
    );
    setSearched(true);

    if (response.ok && description.ok) {
      const data = await response.json();
      const des = await description.json();
      const dest = des.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      ).flavor_text;
      console.log(dest);
      
      setSearchResult(data);
      setDescription(dest);

      console.log(description);

      const formattedPokemon = {
        id: data.id,
        name: data.name,
        order: data.order,
        stats: {
          hp: data.stats.find((stat) => stat.stat.name === "hp")
            .base_stat,
          attack: data.stats.find(
            (stat) => stat.stat.name === "attack"
          ).base_stat,
          defense: data.stats.find(
            (stat) => stat.stat.name === "defense"
          ).base_stat,
        },
        abilities: data.abilities,
        species: data.species.url,
        image: data.sprites.other["official-artwork"].front_default,
        types: data.types,
        description: dest,
      };

      setPokemonData(formattedPokemon);
    } else {
      setSearchResult(null);
    }
  };

console.log(pokemonData);
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
        console.log(pokemonDetails);
  
        // Log the details
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };
    fetchPokemonDetails();
  }, []);

  return (
    <motion.div
      variants={homeContainerVarient}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="main homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
      style={{ backgroundImage: `url(${imgUrl})`,}}>
    {" "}
     <motion.h1
        variants={titleContainerVarient} initial="hidden" animate="visible"
        className="text-center pt-8 mt-5 text-4xl font-semibold">
        {<Header />}</motion.h1>
      {/* <UserProfile /> */}
    
      <section className="mt-5">
        <div className="flex">
        <input className="hero__glow-cta mr-5" type="text" placeholder="Enter Pokemon name" value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}/>
        <button className="hero__glow-cta" onClick={handleSearch}>
          Search
        </button>
        </div>
        </section>
        {searched && !searchResult && (<h2>not found</h2>)}
          {searchResult && (
              <motion.div
          initial={{ y: 800, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.5}}
          className="container flex justify-center"
        >
              <motion.div whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", duration: 0.2, bounce: true }} className="pokecard w-[25%] mt-10">
              <div className="pokecard-header ">
                <h2 className="pokecard-title">{pokemonData.name}</h2>

        <span className="pokecard-hp text-black font-semibold">
          HP: {pokemonData.stats.hp}
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
          <img className="pokecard-image" src={pokemonData.image} alt={pokemonData.name} />
          <p className="pokecard-order">{pokemonData.order}</p>
          <div className="pokecard-stats">
            <span className="pokecard-attack">Attack: {pokemonData.stats.attack}</span>
            <span className="pokecard-defense">Defense: {pokemonData.stats.defense}</span>
          </div>
        </div>
      </Link>
      <div className="pokecard-body">
        <p className="pokecard-type text-black font-bold">
          Type: {pokemonData.types.map((type) => type.type.name).join(", ")}
        </p>
        <p className=" text-black line-clamp-2 py-6 pl-6 pr-6 text-sm">
          {pokemonData.description}
        </p>
      </div>
      <div className="pokecard-buttons">
          <Link to={`/allpokes/${pokemonData.id}`}>
            <p className="pokecard-details">DETAILS</p>
          </Link>
          <Link to="/gameplay">
            <p className="pokecard-fight">FIGHT</p>
          </Link>
        </div>
    </motion.div>
    </motion.div>
          )
          }
      
      <motion.div
          initial={{ y: 800, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.5, delay: 1.5 }}
          className="container grid sm:grid-cols-1  md:grid-cols-2 justify-center lg:grid-cols-3  xl:grid-cols-4 mx-auto gap-4"
        >
      
        {details.map((pokemon) => (
          <li key={pokemon.id}>
             
              <motion.div whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", duration: 0.2, bounce: true }} className="pokecard mt-10">
              <div className="pokecard-header ">
                <h2 className="pokecard-title">{pokemon.name}</h2>

        <span className="pokecard-hp text-black font-semibold">
          HP: {pokemon.stats[1].base_stat}
        </span>
      </div>
      <Link to={`/allpokes/${pokemon.id}`}>
        <div className="pokecard-img-container">
          <div className="pokecard-background">
            <img
              src={electric}
              alt="Pokecard background"
              className="pokecard-background_img"
            />
          </div>
          <img className="pokecard-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p className="pokecard-order">{pokemon.order}</p>
          <div className="pokecard-stats">
            <span className="pokecard-attack">Attack: {pokemon.stats[1].base_stat}</span>
            <span className="pokecard-defense">Defense: {pokemon.stats[2].base_stat}</span>
          </div>
        </div>
      </Link>
      <div className="pokecard-body">
        <p className="pokecard-type text-black font-bold">
          Type: {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>
        <p className=" text-black line-clamp-2 py-6 pl-6 pr-6 text-sm">
          {pokemon.description}
        </p>
      </div>
      <div className="pokecard-buttons">
          <Link to={`/allpokes/${pokemon.id}`}>
            <p className="pokecard-details">DETAILS</p>
          </Link>
          <Link to="/gameplay">
            <p className="pokecard-fight">FIGHT</p>
          </Link>
        </div>
    </motion.div>
    
          </li>
        ))}
      
      </motion.div>
    </motion.div>
  );
};

export default AllPoke;
