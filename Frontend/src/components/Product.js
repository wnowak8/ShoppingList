import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Product = ({ item, deleteProduct, editProduct, toggleComplete }) => {
  return (
    <div className="Product">
      <p className={`${item.completed ? 'completed' : 'incompleted'}`} onClick={() => toggleComplete(item.id)}>
      <strong>{item.name}</strong>
      <span className="additional-info">
      <span className="category-info">{item.category}</span>
      <span className="quantity-info">{item.quantity}</span>
    </span>
      </p>
      <div className="edit-delete-container">
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editProduct(item.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteProduct(item.id)} />
      </div>
    </div>
  );
};
