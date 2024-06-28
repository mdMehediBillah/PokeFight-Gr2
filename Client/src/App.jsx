import "./App.css";
import CollectionPage from "./pages/collectionPage";
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <h1>Hello World</h1>
        <Routes>
          <Route index />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
