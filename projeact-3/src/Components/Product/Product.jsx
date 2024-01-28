import React from "react";
import "./product.css";
import Pagination from "react-bootstrap/Pagination";

import Button from "react-bootstrap/Button";
function CurrencyDisplay({ value, currency = "JPY" }) {
  const formattedValue = value.toLocaleString("ja-JP");
  return (
    <span>
      {formattedValue} {currency}
    </span>
  );
}
function Product({ state, addToCart, paginate, itemsPerPage, totalItems }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <section className="card-container .row-cols-3 ">
        {state.map((product) => (
          <div className="card " style={{ width: "18rem" }} key={product.id}>
            <div className="card-header ">
              <img src={product.url1} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <h6>{product.category}</h6>
              <h4 className="card-title">{product.company}</h4>
              <p className="card-text">
                <span>Color :{product.color}</span>
                <br />
                <span>Style :{product.style}</span>
              </p>
            </div>
            <div className="card-footer">
              <span className="card-price">
                Price: <CurrencyDisplay value={product.price}></CurrencyDisplay>
              </span>
            </div>
            <Button variant="success" onClick={() => addToCart(product)}>
              Buy
            </Button>{" "}
          </div>
        ))}
      </section>
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} />

        {/* Hiển thị các nút trang */}
        {pageNumber.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={() => paginate(currentPage + 1)} />
        <Pagination.Last onClick={() => paginate(pageNumber.length)} />
      </Pagination>
    </>
  );
}

export default Product;
