import axios from "axios";

// get all Pokemon
export const getAll = (req, res) => {
  res.send("This are all pokemon");
};

// get one Pokemon
export const getOne = async (req, res) => {
  const { id } = req.params;
  console.log("Requested ID:", id);

  try {
    // fetch data from the PokéAPI
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = response.data;

    if (pokemonData) {
      // Process and send the fetched Pokémon data
      const image = pokemonData.sprites.other["official-artwork"].front_default;
      const speciesResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const speciesData = speciesResponse.data;
      const description = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      ).flavor_text;

      const pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        order: pokemonData.order,
        description: pokemonData.description,
        stats: pokemonData.stats,
        hp: pokemonData.stats[0].base_stat,
        attack: pokemonData.stats[1].base_stat,
        defense: pokemonData.stats[2].base_stat,
        abilities: pokemonData.abilities,
        height: pokemonData.height,
        weight: pokemonData.weight,
        species: pokemonData.species.url,
        image: image,
        showdown: pokemonData.sprites.other.showdown.front_default,
        types: pokemonData.types,
      };
      res.json(pokemon);
    } else {
      res.status(404).send("Pokémon not found");
    }
  } catch (error) {
    console.error("Error fetching pokemon from PokéAPI:", error);
    res.status(500).send("Internal Server Error");
  }
};

// get one Detail of one Pokemon
export const getOneDetail = (req, res) => {
  res.send("This is one detail of one pokemon");
};
