import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export const EditForm = ({ editProduct, item }) => {
  const [value, setValue] = useState(item.item);

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct({ ...item, item: value });
  };

  return (
    <form onSubmit={handleSubmit} className="Form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="name-input"
        placeholder="Update item"
      />
      <button type="submit" className="sub-btn">
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </form>
  );
};
