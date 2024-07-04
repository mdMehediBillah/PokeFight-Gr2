import "./HomePage.css";
import imgUrl from "../../images/homeBg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UserProfile from "../../Components/Header/UserProfile";
import { useEffect } from "react";

import PokeCard from "../../Components/PokeCard.jsx";
import Header from "../../Components/Header.jsx";

const HomePage = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);
  const homeContainerVarient = {
    hidde: {
      opacity: 0.6,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      x: "100vw",
      transition: { ease: "easeInOut" },
    },
  };

  const titleContainerVarient = {
    hidde: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        delay: 0.7,
        duration: 0.5,
      },
    },
  };

  const subTitleContainerVarient = {
    hidde: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        delay: 0.8,
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      variants={homeContainerVarient}
      initial="hidde"
      animate="visible"
      exit="exit"
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]
      "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      {" "}
      <h3 className="text-black py-2">{userName}</h3>
      <motion.h1
        variants={titleContainerVarient}
        initial="hidde"
        animate="visible"
        className="text-center pt-8 text-4xl font-semibold"
      >
        {<Header />}
      </motion.h1>
      <UserProfile />
      <motion.h2
        variants={subTitleContainerVarient}
        initial="hidde"
        animate="visible"
        className="text-center pt-8 text-2xl font-semibold text-black"
      >
        The best place to fight with Pokemon
      </motion.h2>
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
      </div>
    </motion.div>
  );
};

export default HomePage;
