import "./HomePage.css";
import imgUrl from "../../images/homeBg.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]
      "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <h1 className="text-center pt-8 text-4xl font-semibold">
        Welcome to PokeFight
      </h1>
      <h2 className="text-center pt-8 text-2xl font-semibold">
        The best place to fight with Pokemon
      </h2>
      <Link to="/allPokes">
        <h2 className="text-center pt-8 text-xl font-semibold">Show all</h2>{" "}
      </Link>

      <div className="flex items-center justify-center gap-4 w-72 m-auto mt-10 bg-cyan-50">
        <Link to="/allpokes/:id">
          <p>Details</p>
        </Link>

        <Link to="/gameplay">
          <p>Select to PokeFight</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
