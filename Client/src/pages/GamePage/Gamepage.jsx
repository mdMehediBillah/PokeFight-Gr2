// import "./GamePage.css";
import { Link } from "react-router-dom";

import imgUrl from "../../images/gamePlayBg.jpg";

const Gamepage = () => {
  return (
    <div
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]
  "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <h1 className="text-center pt-8 text-4xl font-semibold">
        {" "}
        Fight with Pokemon
      </h1>
      <div className="flex gap-4 w-72 bg-cyan-50 justify-center mx-auto font-semibold mt-6">
        <Link to="/home">
          <p>Change</p>
        </Link>
        <p>Fight</p>
      </div>
      <div className="flex gap-4 w-72 bg-cyan-50 justify-center mx-auto font-semibold mt-6">
        <Link to="/score">
          <p>Scores</p>
        </Link>
      </div>
    </div>
  );
};

export default Gamepage;
