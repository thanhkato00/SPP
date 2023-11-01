import React, { useEffect, useState } from "react";
import Navbars from "./Navbars/Navbars";
import axios from "axios";

import Product from "./Product/Product";
import Sidebar from "./Sidebar/Sidebar";
import Recommended from "./Recommended/Recommended";
function HomePage() {
  const [state, setState] = useState([]);
  const url = "http://localhost:8000/product";

  const loadData = () => {
    axios
      .get(url)
      .then((response) => {
        setState(response.data);
      })
      .catch((err) => console.log(err));
  };

  // Gọi loadData khi component được render
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbars />
      <Recommended />
      <Sidebar />
      <div
        style={{ marginLeft: "25rem", padding: "2rem", fontSize: "1rem" }}
      ></div>
      <Product state={state} />
    </div>
  );
}

export default HomePage;
