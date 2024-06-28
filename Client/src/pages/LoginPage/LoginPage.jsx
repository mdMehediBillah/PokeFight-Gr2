import "./LoginPage.css";
import imgUrl from "../../images/signUpBg.jpg";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]
  "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <h1 className="text-center text-4xl font-semibold bg-cyan-100 w-72 mx-auto ">
        Login your account
      </h1>
      <Link to="/home">
        <h2 className="text-center mt-8 text-xl font-semibold bg-cyan-100 w-72 mx-auto">
          Home
        </h2>{" "}
      </Link>
    </div>
  );
};

export default LoginPage;
