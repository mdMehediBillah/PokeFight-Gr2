<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components

// Pages
import HomePage from "./pages/HomePage/HomePage";
import Gamepage from "./pages/GamePage/Gamepage";
import DetailPage from "./pages/DetailPage/DetailPage";
import AllPoke from "./pages/AllPoke/AllPoke";
import ScorePage from "./pages/ScorePage/ScorePage";
import LoginPage from "./pages/LoginPage/LoginPage";
=======
import "./App.css";
import CollectionPage from "./pages/collectionPage";
import { Routes, Route} from "react-router-dom";
>>>>>>> collection-page

function App() {
  return (
    <>
<<<<<<< HEAD
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
=======
      <div className="App">
        <h1>Hello World</h1>
        <Routes>
          <Route index />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
>>>>>>> collection-page
    </>
  );
}

export default App;
