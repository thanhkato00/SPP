import React, { useEffect, useState, useMemo } from "react";
import Navbars from "./Navbars/Navbars";
import axios from "axios";

import Product from "./Product/Product";
import Sidebar from "./Sidebar/Sidebar";
import Recommended from "./Recommended/Recommended";
import Search from "./Search+giohang/Search";
import Footer from "./Footer/Footer";

function HomePage() {
  const [state, setState] = useState([]);
  const [filters, setFilters] = useState({
    price: null,
    color: null,
    category: null,
  });
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsList, setCartItemsList] = useState([]);
  const url = "http://localhost:8000/product";

  const loadData = () => {
    axios
      .get(url)
      .then((response) => {
        setState(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (newFilters) => {
    console.log("Giá trị trả về: ", newFilters);

    // Kiểm tra nếu đã chọn giá tiền và giống nhau, thì thay đổi giá trị
    if (
      filters.price &&
      newFilters.price &&
      filters.price.min === newFilters.price.min &&
      filters.price.max === newFilters.price.max
    ) {
      const updatedFilters = { ...filters, price: newFilters.price };
      setFilters(updatedFilters);
    } else {
      // Nếu không, thêm điều kiện giá tiền mới
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
    }
  };
  const removeFromCart=(productToRemove)=>{
    const updateCartItemList=cartItemsList.filter(item => item!==productToRemove);
    const updateCartItems=cartItemsList.filter(item => item!==productToRemove);
    setCartItems(updateCartItems);
    setCartItemsList(updateCartItemList);
  }
  //sử dụng useMemo để lưu lại những giá trị không thay đổi
  const searchResults = useMemo(() => {
    let filteredResults = state;

    if (filters.price) {
      filteredResults = filteredResults.filter((product) => {
        return (
          product.price >= filters.price.min &&
          product.price <= filters.price.max
        );
      });
    }

    if (filters.color) {
      filteredResults = filteredResults.filter((product) => {
        return product.color === filters.color;
      });
    }

    if (filters.category) {
      filteredResults = filteredResults.filter((product) => {
        return product.category === filters.category;
      });
    }

    return filteredResults;
  }, [state, filters]);
  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item.company === product.company
    );

    if (existingProduct) {
      alert(`San pham ${product.company} ddax toofn taij`);
      console.log("da check dk");
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới
      setCartItemsList([{ ...product, quantity: 1 }, ...cartItemsList]);
      setCartItems([{ ...product, quantity: 1 }, ...cartItems.slice(0, 4)]);
    }
  };
  console.log(cartItems);
  console.log(cartItemsList);
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div className="spdcontainer">
        <header style={{background:"none"}}>
          <div className="spcontainer">
            <Navbars />
            <Search cartItems={cartItems} cartItemsList={cartItemsList} removeFromCart={removeFromCart}/>
          </div>
        </header>
        <section>
          <Recommended onSearch={handleSearch} />
          <Sidebar onSearch={handleSearch} />
          <Product state={searchResults} addToCart={addToCart} />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
