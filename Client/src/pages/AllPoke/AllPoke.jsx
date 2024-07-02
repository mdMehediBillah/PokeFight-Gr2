// import "./AllPokes.css";
// import { Link } from "react-router-dom";
import imgUrl from "../../images/allPokes.jpg";
import { useState } from "react";

const AllPoke = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    if (!searchInput) return;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`
    );
    if (response.ok) {
      const data = await response.json();
      setSearchResult(data);
    } else {
      setSearchResult(null);
    }
  };

  return (
    <div
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <h1 className="text-center pt-8 text-4xl font-semibold">All Pokemones</h1>
      <input
        type="text"
        placeholder="Enter Pokemon name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {searchResult && (
        <div>
          <h2>{searchResult.name}</h2>
          <p>Height: {searchResult.height}</p>
          <p>Weight: {searchResult.weight}</p>
          <img
            src={searchResult.sprites.front_default}
            alt={searchResult.name}
          />
        </div>
      )}

      {/* <div>
                {collection.map((item) => (
                    <div key={item.name}>
                        <h2>{item.name}</h2>
                        <p>URL: {item.url}</p>
                    </div>
                ))}
            </div> */}
    </div>
  );
};

export default AllPoke;
