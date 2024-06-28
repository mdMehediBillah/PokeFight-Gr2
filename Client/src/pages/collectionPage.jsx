import { useState, useEffect } from "react";

const CollectionPage = () => {
    const [collection, setCollection] = useState([]);
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        const fetchCollection = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=70");
        const data = await response.json();
        setCollection(data.results);
        };
        fetchCollection();
    }, []);
    return (
          <div>
            {collection.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} alt={`${item.name} sprite`} />
                </div>
            ))}
        </div>
    );
};

export default CollectionPage;