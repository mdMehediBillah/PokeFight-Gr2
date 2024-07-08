import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import pokeIcon from "../assets/favicon.png";

const Footer = () => {
  return (
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
  );
};

export default Footer;
