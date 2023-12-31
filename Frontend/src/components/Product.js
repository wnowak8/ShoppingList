import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Product = ({ item, deleteProduct, editProduct }) => {
  return (
    <div className="Product">
      <div className="product-name-container">
        <strong>{item.name}</strong>
        <span className="category-info">{item.category}</span>
        <span className="quantity-info">{item.quantity}</span>
      </div>
      <div className="edit-delete-container">
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => {
            editProduct(item._id);
          }}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => {
            deleteProduct(item._id);
          }}
        />
      </div>
    </div>
  );
};
