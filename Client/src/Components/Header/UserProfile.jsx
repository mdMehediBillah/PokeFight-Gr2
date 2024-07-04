import { FaUserCircle } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
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
      localStorage.removeItem("userName");
      toast.success("Logout successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn bg-green-600 text-white m-1"
        >
          <FaUserCircle />
          {userEmail}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-orange-300 z-[1] w-52 p-1 shadow text-black rounded font-semibold"
        >
          <li onClick={handleLogout}>
            <span>
              {" "}
              <GrLogout />
              Logout
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserProfile;
