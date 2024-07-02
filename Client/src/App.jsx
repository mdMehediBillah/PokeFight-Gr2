import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
