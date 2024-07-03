import "./AllPoke.css";
// import { Link } from "react-router-dom";
import imgUrl from "../../images/allPokes.jpg";
import { useState, useEffect } from "react";

const AllPoke = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [description, setDescription] = useState("non defined");
  const [details, setDetails] = useState([]);

  const handleSearch = async () => {
    if (!searchInput) return;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`
    );
    const description = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${searchInput.toLowerCase()}`
    );

    if (response.ok && description.ok) {
      const data = await response.json();
      const des = await description.json();
      setDescription(des);
      setSearchResult(data);
      console.log(description);
      console.log(response);
    } else {
      setSearchResult(null);
    }
  };

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
      console.log(pokemonDetails);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []); //

  return (
    <div
      className="main homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <section>
        <input
          className="hero__glow-cta"
          type="text"
          placeholder="Enter Pokemon name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="hero__glow-cta" onClick={handleSearch}>
          Search
        </button>
        <div>
          {searchResult && (
            <div>
              <h2>{searchResult.name}</h2>
              <p>descripiton: {description.base_happiness}</p>
              <p>Height: {searchResult.height}</p>
              <p>Weight: {searchResult.weight}</p>
              <img
                src={searchResult.sprites.front_default}
                alt={searchResult.name}
              />
            </div>
          )}
        </div>
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
    </div>
  );
};

export default AllPoke;
