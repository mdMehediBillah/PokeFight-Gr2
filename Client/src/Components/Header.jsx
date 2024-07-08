// import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import PokeFight from "./../assets/pokeFight.png";

const Header = () => {
  return (
    <header className="flex justify-center pt-4  w-80 mx-auto">
      <Link to="/home">
        <img src={PokeFight} alt="Pokefight logo" className="w-[100%] -mt-12" />
      </Link>
    </header>
  );
};

export default Header;
