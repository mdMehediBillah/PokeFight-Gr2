
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components

// Pages
import HomePage from "./pages/HomePage/HomePage";
import Gamepage from "./pages/GamePage/Gamepage";
import DetailPage from "./pages/DetailPage/DetailPage";
import AllPoke from "./pages/AllPoke/AllPoke";
import ScorePage from "./pages/ScorePage/ScorePage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/allpokes" element={<AllPoke />} />
          <Route path="/allpokes/:id" element={<DetailPage />} />
          <Route path="/gameplay" element={<Gamepage />} />
          <Route path="/score" element={<ScorePage />} />
        </Routes>
      </BrowserRouter>
    </>

import React from "react";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
    // <>
    //   <div className="App">
    //     <Signup />
    //   </div>
    // </>
  );
}

export default App;
