import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./../assets/welcome-logo.svg";

const Header = () => {
  return (
    <header className="flex justify-center pt-4 ">
      {/* <Link to="/home"> */}
      <img src={logo} alt="Pokefight logo" className="w-[100%] -mt-12" />
      {/* </Link> */}
    </header>
  );
};

export default Header;
