import "./HomePage.css";
import imgUrl from "../../images/homeBg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UserProfile from "../../Components/Header/UserProfile.jsx";
import { useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import pokeIcon from "../../assets/favicon.png";

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
      x: 400,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 1,
        duration: 0.5,
      },
    },
  };
  const userNameVarient = {
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

  const showAllVarient = {
    hidde: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 1.2,
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
      className="  min-h-screen bg-cover bg-center bg-no-repeat w-[100%]
      "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >

      <div>
        <div className="flex container justify-between mx-auto py-4">
          <UserProfile />
          <Link to="/allPokes">
            <motion.h2
              variants={showAllVarient}
              initial="hidde"
              animate="visible"
              className="font-semibold text-black hover:underline "
            >
              Show all
            </motion.h2>{" "}
          </Link>

        </div>
        <motion.h3
          variants={userNameVarient}
          initial="hidde"
          animate="visible"
          className="text-black py-1 font-semibold text-black px-3 text-center"
        >
          {userName}
        </motion.h3>
        <motion.h1
          variants={titleContainerVarient}
          initial="hidde"
          animate="visible"
          className="text-center pt-8 text-4xl font-semibold"
        >
          {<Header />}
        </motion.h1>
        <motion.h2
          variants={subTitleContainerVarient}
          initial="hidde"
          animate="visible"
          className="text-center py-2 mb-12 text-1xl font-semibold text-black"
        >
          The best place to fight with Pokemon
        </motion.h2>

        <motion.div
          initial={{ y: 800, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.5, delay: 1.5 }}
          className="container grid sm:grid-cols-1  md:grid-cols-2 justify-center lg:grid-cols-3  xl:grid-cols-4 mx-auto gap-4"
        >
          <div className="mb-8">
            <PokeCard />
          </div>
          <div className="mb-8">
            <PokeCard />
          </div>
          <div className="mb-8">
            <PokeCard />
          </div>
          <div className="mb-8">
            <PokeCard />
          </div>
          <div className="mb-8">
            <PokeCard />
          </div>
          <div className="mb-8">
            <PokeCard />
          </div>
          <div className="mb-8">
            <PokeCard />
          </div>
          <div className="mb-8">
            <PokeCard />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.5, delay: 1.5 }}
          className="container mx-auto py-10 flex justify-around items-end "
        >
          <div className="bg-cyan-900 rounded-lg text-center text-white text-sm text-black py-1 px-2 flex gap-3 items-center">
            follow us:{" "}
            <div className="flex gap-2 items-center">
              <FaFacebookF /> <FaInstagram /> <FaTiktok />
            </div>
          </div>
          <motion.div
            animate={{
              rotate: [0, 200, 200, 0, -200, -200, 0],
              x: [0, 200, 200, 0, -200, -200, 0],
            }}
            transition={{ delay: 1.5, duration: 6, repeat: Infinity }}
            className="bg-cyan-200 rounded-lg text-center text-sm text-black  bg-transparent"
          >
            <img src={pokeIcon} alt="icon" className="w-10 h-10" />
          </motion.div>
          <div className="bg-cyan-900 rounded-lg text-center text-white text-sm text-black py-1 px-2">
            All rights reserved @pokeFight.com
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
