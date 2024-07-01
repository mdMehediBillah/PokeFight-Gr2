import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/signUpBg.jpg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      navigate("/login");
    },
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div
        className="text-yellow-500 p-8 rounded shadow-md w-full max-w-md"
        style={{
          background: "rgba(102,224,2,0.2)",
          WebkitBackdropFilter: "blur(5px)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(102,224,2,0.1)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-yellow-400 text-left">
              First Name
            </label>
            <input
              type="firstname"
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              className="mt-1 p-2 w-full border rounded"
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="text-red-500 text-sm">
                {formik.errors.firstname}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-yellow-400 text-left">Last Name</label>
            <input
              type="lastname"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              className="mt-1 p-2 w-full border rounded"
            />
            {formik.touched.firstname && formik.errors.lastname ? (
              <div className="text-red-500 text-sm">
                {formik.errors.lastname}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-yellow-400 text-left">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 p-2 w-full border rounded"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-yellow-400 text-left">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 p-2 w-full border rounded"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-yellow-400 text-left">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="mt-1 p-2 w-full border rounded"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-green-700 p-2 rounded mt-4 font-bold"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-yellow-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 underline">
            Login instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
