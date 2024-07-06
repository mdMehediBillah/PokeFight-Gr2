import "./SuccessModal.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ closeModal, selectedPokemon }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleCloseModal = () => {
    closeModal(null);
  };
  const handlePlayAgain = () => {
    closeModal(null);
    navigate("/home");
  };

  return (
    <div className="modalBg">
      <motion.div
        initial={{ scale: 0, opacity: 0, rotateX: 180, x: "-100vw" }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, x: 0 }}
        transition={{ type: "spring", duration: 0.2, bounce: 20 }}
        className="modalContainer"
      >
        <div className="titleCloseBtn">
          <button onClick={handleCloseModal}> X </button>
        </div>
        <div>
          <img
            className="modalImage"
            src={selectedPokemon.image}
            alt={selectedPokemon.name}
          />
          <h2 className="text-center text-3xl font-semibold mt-24  py-2 text-black">
            Congratulation! {userName}
          </h2>
        </div>
        <div>
          <p className="text-center mt-2 text-black text-xl">
            Your Pokemon <strong>{selectedPokemon.name}</strong> wins
          </p>
        </div>
        <div className="flex mt-6 justify-between gap-4 mt-16">
          <button
            className=" bg-orange-300 hover:bg-orange-200 text-black font-semibold py-2 rounded w-full"
            onClick={handlePlayAgain}
          >
            Play again
          </button>
          <button className=" bg-cyan-400 hover:bg-cyan-200 text-black font-semibold py-2 rounded w-full">
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
