import "./HomePage.css";
import imgUrl from "../../images/homeBg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UserProfile from "../../Components/Header/UserProfile.jsx";
import { useEffect } from "react";
import PokeCard from "../../Components/PokeCard.jsx";
import Header from "../../Components/Header.jsx";
import Footer from "../../Components/Footer.jsx";

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
        <div className="flex container justify-between mx-auto px-8 py-4">
          <UserProfile />
          <Link to="/allPokes">
            <motion.h2
              variants={showAllVarient}
              initial="hidde"
              animate="visible"
              className="home-pokedex-btn"
            >
              POKÉDEX
            </motion.h2>{" "}
          </Link>
        </div>
        <motion.h1
          variants={titleContainerVarient}
          initial="hidde"
          animate="visible"
          className="text-center -mt-[25px] text-4xl font-semibold"
        >
          {<Header />}
        </motion.h1>
        <motion.h3
          variants={userNameVarient}
          initial="hidde"
          animate="visible"
          className="text-black py-1 font-semibold text-black px-4 text-center uppercase"
        >
          Welcome, {userName}
        </motion.h3>
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
          transition={{ type: "tween", duration: 0.5, delay: 0.5 }}
          className="container mx-auto  font-bold text-black m-6 "
          onClick={() => window.location.reload()}
        >
          <span className="bg-cyan-200 py-2 px-4 rounded-xl hover:bg-cyan-400 hover:cursor-pointer">
            More Pokemon
          </span>
        </motion.div>
        <motion.div
          initial={{ y: 800, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.5, delay: 1.5 }}
          className="container grid sm:grid-cols-1 md:grid-cols-2 justify-center lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-4"
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
        <Footer />
      </div>
    </motion.div>
  );
};

export default HomePage;
