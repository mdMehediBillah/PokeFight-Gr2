import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../utils/myLocalURL.js";

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
      toast.success("Logout successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex items-center gap-1  px-2 py-1  rounded mx-auto text-black ">
        <FaUserCircle />
        <span>{userEmail}</span>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default UserProfile;
