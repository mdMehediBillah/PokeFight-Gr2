import { FaUserCircle } from "react-icons/fa";
const UserProfile = () => {
  return (
    <div className="flex items-center gap-1  px-2 py-1  rounded mx-auto text-black ">
      <FaUserCircle />
      <span>User</span>
    </div>
  );
};

export default UserProfile;
