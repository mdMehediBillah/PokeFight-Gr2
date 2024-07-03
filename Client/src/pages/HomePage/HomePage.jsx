import "./HomePage.css";
import imgUrl from "../../images/homeBg.jpg";
import { Link } from "react-router-dom";
import PokeCard from "../../Components/PokeCard.jsx";
import Header from "../../Components/Header.jsx";

const HomePage = () => {
  return (
    <div
      className="homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <Header />
      <h2 className="text-center pt-2 text-2xl font-semibold">
        The best place to fight with Pokemon
      </h2>
      <Link to="/allPokes">
        <h2 className="text-center pt-8 text-xl font-semibold">Show all</h2>{" "}
      </Link>

      <div className="justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-4 mx-20 mt-8 gap-0">
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
        <div className="w-full">
          <PokeCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
