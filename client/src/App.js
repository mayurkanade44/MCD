import Audit from "./pages/Audit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRestro from "./components/AddRestro";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/addRestro" element={<AddRestro />} />
          <Route path="/audit/:id" element={<Audit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
