import "./ScorePage.css";
import { motion } from "framer-motion";

// import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { URL } from "../../utils/myLocalURL.js";
import imgUrl from "../../images/scoreBg.jpg";
import { format } from "date-fns";
import Header from "../../Components/Header.jsx";
import Footer from "../../Components/Footer.jsx";
import UserProfile from "../../Components/Header/UserProfile.jsx";
import { Link } from "react-router-dom";

const ScorePage = () => {
  const [scores, setScore] = useState([]);

  const getAllScores = async () => {
    try {
      const { data } = await axios.get(`${URL}/scores`);
      setScore(data);
    } catch (error) {
      console.error("Error saving data to database:", error);
    }
  };
  // Fetch scores from the backend API when the component mounts or when the scores change.
  useEffect(() => {
    getAllScores();
  }, []);
  console.log(scores);
  // Display the scores in a table.

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
    <div
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]
    "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="flex container justify-between mx-auto px-8 py-4">
        <UserProfile />
        <Link to="/home">
          <motion.h2
            variants={showAllVarient}
            initial="hidde"
            animate="visible"
            className="home-pokedex-btn"
          >
            Home
          </motion.h2>{" "}
        </Link>
      </div>
      <motion.div
        initial={{ scale: 2, opacity: 0, y: 200 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className=" mb-6"
      >
        <Header />
      </motion.div>
      <motion.section
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.2, bounce: 20 }}
        className="tableBg p-3 text-black mx-auto mb-10"
      >
        <h1 className="text-center text-2xl font-semibold text-black colBg mb-4">
          {" "}
          Archive Players Statistics
        </h1>
        <table className="users-table">
          <thead className="table-head">
            <tr className="head-tr bg-gray-800 text-gray-100">
              <th className="colBg"> Player</th>
              <th className="colBg">Pokemon</th>
              <th className="colBg ">Pokemon helth</th>
              <th className="colBg">Com.Poke</th>
              <th className="colBg">Com.Poke helth</th>
              <th className="colBg">Winner</th>
              <th className="colBg">Playing time</th>
            </tr>
          </thead>
          <tbody>
            {scores &&
              scores.map((score) => {
                return (
                  <tr key={score._id} className="body-tr ">
                    <td className="colBg"> {score.user_name} </td>
                    <td className="colBg"> {score.user_pokemon} </td>
                    <td className="colBg text-center"> {score.user_helth} </td>
                    <td className="colBg"> {score.random_pokemon} </td>
                    <td className="colBg text-center">
                      {" "}
                      {score.computer_helth}{" "}
                    </td>
                    <td className="colBg"> {score.game_winner} </td>
                    <td className="colBg">
                      {" "}
                      {format(
                        new Date(score.createdAt),
                        "dd/MM/yyyy HH:mm"
                      )}{" "}
                    </td>

                    <td className="body-cell"> </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </motion.section>
      <Footer />
    </div>
  );
};

export default ScorePage;
