import React from "react";
import "./OneProduct.css";
import useProductStore from "../../utilities/store/productStore";
const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

function OneProduct() {
  const { selectedProduct } = useProductStore();
  return (
    <div className="one-product-container">
      <div className="one-product-image">
        <img
          src={ `http://localhost:5198/${selectedProduct.image }`
                     }
          alt={selectedProduct.name}
        />
      </div>
      <div className="one-product-details">
        <text> <strong>Name:</strong> {selectedProduct.name}</text> <br />
        <text> <strong>Price:</strong> {selectedProduct.price} dt</text> <br />
        <text><strong>Description:</strong> {selectedProduct.description}</text>
      </div>
    </div>
  );
}

export default OneProduct;
