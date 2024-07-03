// import "./AllPokes.css";
// import { Link } from "react-router-dom";
import imgUrl from "../../images/allPokes.jpg";

const AllPoke = () => {
  return (
    <div
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]
  "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <h1 className="text-center pt-8 text-4xl font-semibold">All Pokemon</h1>
    </div>
  );
};

export default AllPoke;
