import React, { useEffect, useState, useMemo } from "react";
import Navbars from "./Navbars/Navbars";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

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
  //phan tran
  const [currentPage, setCurrentPage] = useState(1);
  //so phan tu trong 1 tran
  const [limitPerPage, setLimitPerPage] = useState(6);
  //tong so trang
  const [searchInput, setSearchInput] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsList, setCartItemsList] = useState([]);
  const url = "http://localhost:8000/product";

  const loadData =async () => {
    let url = `http://localhost:8000/product?_page=${currentPage}&_limit=${limitPerPage}`;
    if (searchInput) {
      url = `http://localhost:8000/product?q=${searchInput}&_page=${currentPage}&_limit=${limitPerPage}`;
    }
    else if(filters.category){
      url = `http://localhost:8000/product?category=${filters.category}&_page=${currentPage}&_limit=${limitPerPage}`;
    }
    else if (filters.color) {
      url = `http://localhost:8000/product?color=${filters.color}&_page=${currentPage}&_limit=${limitPerPage}`;
    } else if (filters.price) {
      url = `http://localhost:8000/product?price_min=${filters.price.min}&price_max=${filters.price.max}&_page=${currentPage}&_limit=${limitPerPage}`;
    }
    let result = await axios.get(url);
    const countResult = result.headers["x-total-count"];
    console.log(countResult);
    const totalResult = Math.ceil(countResult / limitPerPage);
    console.log(totalResult);
    setTotalPages(totalResult);
    setState(result.data);
  };
  let paginationItems=[];
  for(let i=0;i<totalPages;i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        onClick={() => setCurrentPage(i+1)}
        active={i+1 === currentPage}
      >
        {i+1}
      </Pagination.Item>
    )
  }

  const handleSearch = (newFilters) => {
    setCurrentPage(1);
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
  const handleSearchButtonClick = () => {
    loadData();
  };
  console.log(cartItems);
  console.log(cartItemsList);
  useEffect(() => {
    loadData();
  }, [searchInput,currentPage,handleSearch]);
  return (
    <div>
      
        <header className="spcontainer">
          <div >
            <Navbars />
            <Search
              cartItems={cartItems}
              cartItemsList={cartItemsList}
              removeFromCart={removeFromCart}
              searchInput={searchInput}
            />
          </div>
        </header>
        <section>
        <form className="d-flex p-3" onSubmit={(e)=>{e.preventDefault();handleSearchButtonClick();}}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
          <Recommended onSearch={handleSearch} />
          <Sidebar  onSearch={handleSearch} />
          <Product state={searchResults} addToCart={addToCart} />
          <Pagination style={{ position: 'fixed', bottom: '0', right: '0', zIndex: '1', }}>
                <Pagination.First onClick={()=>setCurrentPage(1)} />
                <Pagination.Prev onClick={()=>setCurrentPage(currentPage-1)}/>
                {paginationItems}

                <Pagination.Next onClick={()=>setCurrentPage(currentPage+1)}/>
                <Pagination.Last onClick={()=>setCurrentPage(totalPages)}/>
              </Pagination>
        </section>
        <footer style={{marginTop:"190px"}}>
          <Footer />
        </footer>
      
    </div>
  );
}

export default HomePage;
