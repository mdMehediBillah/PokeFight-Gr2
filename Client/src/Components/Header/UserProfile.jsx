import { FaUserCircle } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../utils/myLocalURL.js";
import { motion } from "framer-motion";

import axios from "axios";

// UserProfile component for displaying the user's profile and logout functionality.
const UserProfile = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  // Function to handle user logout.
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${URL}/logout`);
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("userName");
      localStorage.removeItem("userid");
      toast.success("Logout successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const userEmailVarient = {
    hidde: {
      opacity: 0,
      x: -500,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 0.7,
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <motion.div
        variants={userEmailVarient}
        initial="hidde"
        animate="visible"
        className="dropdown"
      >
        <div
          tabIndex={0}
          role="button"
          className="btn bg-cyan-600 text-white glass btn-xs"
        >
          <FaUserCircle />
          {userEmail}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-red-600 z-[1] shadow text-white rounded font-semibold mt-1"
        >
          <li onClick={handleLogout}>
            <span>
              {" "}
              <GrLogout />
              Logout
            </span>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default UserProfile;
