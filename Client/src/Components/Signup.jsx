import backgroundImage from "../assets/signUpBg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../utils/myLocalURL.js";

import logoURL from "../assets/pokeFight.png";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        first_name,
        last_name,
        email,
        password,
      };
      const { data } = await axios.post(
        `${URL}/users`,

        newProduct
      );
      console.log(data);
      toast.success("SignUp successfully!");
      handleReset();
      navigate("/login");
    } catch (error) {
      // console.log(error.message);
      toast.error("Please fill all information in the form");
      // toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <img src={logoURL} alt="Pokefight logo" className="absolute" />

      <motion.div
        initial={{ opacity: 0.8, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="text-white p-8 rounded shadow-md w-full max-w-md my-8"
        style={{
          background: "rgba(10,80,100,0.6)",
          WebkitBackdropFilter: "blur(5px)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(102,224,2,0.1)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-left text-sm">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              onChange={handleChange}
              value={first_name}
              placeholder="First Name"
              className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-left text-sm">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              value={last_name}
              placeholder="Last Name"
              className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-left text-sm">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="Email"
              className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-left text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              placeholder="Password"
              className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
            />
          </div>

          <motion.button
            initialValue={{ scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full bg-yellow-300 text-black p-2 rounded mt-4 font-bold hover:bg-orange-400"
          >
            Submit
          </motion.button>
        </form>
        <p className="text-center text-white mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-white  pl-2 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
