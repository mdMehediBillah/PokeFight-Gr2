import axios from "axios";

export const fetchRandomPokemon = async () => {
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

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    order: pokemonData.order,
    stats: {
      hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
      attack: pokemonData.stats.find((stat) => stat.stat.name === "attack")
        .base_stat,
      defense: pokemonData.stats.find((stat) => stat.stat.name === "defense")
        .base_stat,
    },
    abilities: pokemonData.abilities,
    height: pokemonData.height,
    weight: pokemonData.weight,
    species: pokemonData.species.url,

    image: pokemonData.sprites.other["official-artwork"].front_default,
    image2: pokemonData.sprites.other["showdown"].front_default,
    types: pokemonData.types,
    description: description,
  };
};
