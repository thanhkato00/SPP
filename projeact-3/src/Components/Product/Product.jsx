import React, { useState } from "react";
import "./product.css";
<<<<<<< HEAD
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
=======
import Pagination from "react-bootstrap/Pagination";
>>>>>>> f73aecf7f872d5ab342ee5c789df5f94568cd22b

import Button from "react-bootstrap/Button";
function CurrencyDisplay({ value, currency = "JPY" }) {
  const formattedValue = value.toLocaleString("ja-JP");
  return (
    <span>
      {formattedValue} {currency}
    </span>
  );
}
<<<<<<< HEAD
function Product({ state, addToCart }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ images: [] });
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
=======
function Product({ state, addToCart, paginate, itemsPerPage, totalItems }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
>>>>>>> f73aecf7f872d5ab342ee5c789df5f94568cd22b
  return (
    <>
      <section className="card-container .row-cols-3 ">
        {state.map((product) => (
          <div className="card " style={{ width: "18rem" }} key={product.id}>
            <div
              className="card-header "
              onClick={() => handleOpenModal(product.images)}
            >
              <img src={product.images[0]} className="card-img-top" alt="..." />
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
<<<<<<< HEAD
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>More Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {selectedProduct.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <h3>{selectedProduct.company}</h3>
          <p>
            Color: {selectedProduct.color} <br />
            Style: {selectedProduct.style}
          </p>
          <span>
            Price:{" "}
            <CurrencyDisplay value={selectedProduct.price}></CurrencyDisplay>
          </span>
        </Modal.Body>
      </Modal>
=======
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
>>>>>>> f73aecf7f872d5ab342ee5c789df5f94568cd22b
    </>
  );
}

export default Product;
