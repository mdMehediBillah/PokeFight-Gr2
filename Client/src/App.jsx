import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

// Components

// Pages
import HomePage from "./pages/HomePage/HomePage";
import Gamepage from "./pages/GamePage/Gamepage";
import DetailPage from "./pages/DetailPage/DetailPage";
import AllPoke from "./pages/AllPoke/AllPoke";
import ScorePage from "./pages/ScorePage/ScorePage";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/allpokes" element={<AllPoke />} />
        <Route path="/allpokes/:id" element={<DetailPage />} />
        <Route path="/gameplay" element={<Gamepage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        limit={1}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>


  );
}

export default App;
