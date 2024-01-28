import React, { useEffect, useState, useMemo } from "react";
import Navbars from "./Navbars/Navbars";
import axios from "axios";

import Product from "./Product/Product";
import Sidebar from "./Sidebar/Sidebar";
import Recommended from "./Recommended/Recommended";
import Search from "./Search+giohang/Search";
import Footer from "./Footer/Footer";
import Pagination from "react-bootstrap/Pagination";
function HomePage() {
  const [state, setState] = useState([]);
  const [filters, setFilters] = useState({
    price: null,
    color: null,
    category: null,
  });
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
  const removeFromCart = (productToRemove) => {
    const updateCartItemList = cartItemsList.filter(
      (item) => item !== productToRemove
    );
    const updateCartItems = cartItemsList.filter(
      (item) => item !== productToRemove
    );
    setCartItems(updateCartItems);
    setCartItemsList(updateCartItemList);
  };
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = currentPage - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div className="spdcontainer">
        <header style={{ background: "none" }}>
          <div className="spcontainer">
            <Navbars />
            <Search
              cartItems={cartItems}
              cartItemsList={cartItemsList}
              removeFromCart={removeFromCart}
            />
          </div>
        </header>
        <section>
          <Recommended onSearch={handleSearch} />
          <Sidebar onSearch={handleSearch} />
          <Product
            state={searchResults}
            addToCart={addToCart}
            paginate={paginate}
            itemsPerPage={itemsPerPage}
            totalItems={searchResults.length}
            pageNumbers={pageNumbers}
          />

          <Pagination>
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />

            {/* Hiển thị các nút trang */}
            {pageNumbers.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => paginate(number)}
              >
                {number}
              </Pagination.Item>
            ))}

            <Pagination.Next onClick={() => paginate(currentPage + 1)} />
            <Pagination.Last onClick={() => paginate(pageNumbers.length)} />
          </Pagination>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
