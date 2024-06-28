import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./../assets/pokefight-logo.svg";

const Header = () => {
  return (
    <header className="header flex justify-center p-4">
      <div className="flex items-center w-full max-w-6xl px-4">
        <div className="flex-grow flex justify-center">
          {/* <Link to="/"> */}
          <img
            src={logo}
            alt="Pokefight logo"
            className="header-logo_img max-w-xs"
          />
          {/* </Link> */}
        </div>
      </div>
      <nav className="flex items-center">
        {/* <Link to="/pokemon" className="ml-4 text-white hover:text-yellow-500"> */}
        See all Pokémon
        {/* </Link> */}
      </nav>
    </header>
  );
};

export default Header;
