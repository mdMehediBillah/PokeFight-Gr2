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
