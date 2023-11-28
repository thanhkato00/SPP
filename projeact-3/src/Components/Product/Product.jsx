import React from "react";
import "./product.css";

import Button from 'react-bootstrap/Button';

function Product({ state,addToCart }) {
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
              <span className="card-price">Price: {product.price} 円</span>
            </div>
            <Button variant="success" onClick={()=>addToCart(product)}>Buy</Button>{' '}
          </div>
        ))}
      </section>
    </>
  );
}

export default Product;
