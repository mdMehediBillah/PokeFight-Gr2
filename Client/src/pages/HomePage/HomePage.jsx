import "./HomePage.css";
import imgUrl from "../../images/homeBg.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserProfile from "../../Components/Header/UserProfile";

const HomePage = () => {
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
      <motion.h1
        variants={titleContainerVarient}
        initial="hidde"
        animate="visible"
        className="text-center pt-8 text-4xl font-semibold"
      >
        Welcome to PokeFight
      </motion.h1>
      <motion.h2
        variants={subTitleContainerVarient}
        initial="hidde"
        animate="visible"
        className="text-center pt-8 text-2xl font-semibold"
      >
        The best place to fight with Pokemon
      </motion.h2>
      <UserProfile />
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
    </motion.div>
  );
};

export default HomePage;
