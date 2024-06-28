import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components

// Pages
import HomePage from "./pages/HomePage/HomePage";
import Gamepage from "./pages/GamePage/Gamepage";
import DetailPage from "./pages/DetailPage/DetailPage";
import AllPoke from "./pages/AllPoke/AllPoke";
import ScorePage from "./pages/ScorePage/ScorePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.css";
import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import PokeCardFight from "./components/PokeCardFight";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="App">
        <h1>Hello World</h1>
        <Header />
        <PokeCard />
        <PokeCardFight />
        <Footer />
      </div>
    </>
  );
}

export default App;
