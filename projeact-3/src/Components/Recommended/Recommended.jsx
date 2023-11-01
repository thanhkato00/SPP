import React from "react";
import "./Recommended.css";
import axios from "axios";
function Recommended({ onSearch }) {
  const url = "http://localhost:8000/product";
  const handleCategorySearch = async (category) => {
    console.log(`Searching for category: ${category}`);
    await axios
      .get(`${url}/search?category=${category}`)
      .then((response) => {
        const searchResults = response.data;
        console.log("Search results:", searchResults);
        onSearch(searchResults);
      })
      .catch((error) => {
        console.error("探すのがエラーです。", error);
      });
  };
  return (
    <div>
      <div className="recommended-flex">
        <button
          className="btns"
          onClick={() => handleCategorySearch("All Product")}
        >
          All Product
        </button>
        <button className="btns" onClick={() => handleCategorySearch("Nike")}>
          Nike
        </button>
        <button className="btns" onClick={() => handleCategorySearch("Adidas")}>
          Adidas
        </button>
        <button className="btns" onClick={() => handleCategorySearch("Jordan")}>
          Jordan
        </button>
        <button
          className="btns"
          onClick={() => handleCategorySearch("Sneaker")}
        >
          Sneaker
        </button>
        <button className="btns" onClick={() => handleCategorySearch("MLB")}>
          MLB
        </button>
        <button
          className="btns"
          onClick={() => handleCategorySearch("Onitsuka Tiger")}
        >
          Onitsuka Tiger
        </button>
        <button
          className="btns"
          onClick={() => handleCategorySearch("Dr. Martens")}
        >
          Dr. Martens
        </button>
      </div>
    </div>
  );
}

export default Recommended;
