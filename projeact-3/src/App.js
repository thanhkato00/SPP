import { Link, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import RouterPage from "./RouterPage/RouterPage";
import TopPage from "./Components/TopPage/TopPage";
import HomePage from "./Components/HomePage";

// import About from "../../supper-shoes/src/Components/About";
// import Contact from "../../supper-shoes/src/Components/Contact";

function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/resigter" element={<Resigter />}></Route>
        <Route path="/useinterface" element={<UseInterfacePage />}></Route>
      </Routes> */}
      <RouterPage />
    </div>
  );
}

export default App;
