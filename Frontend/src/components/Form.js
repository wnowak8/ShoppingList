import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const Form = ({ addProduct }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  const categoryOptions = ["electronics", "clothing", "groceries"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && category) {
      addProduct({ name, category, quantity });
      setName("");
      setCategory("");
      setQuantity(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="name-input"
        placeholder="Add product"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
        required
      >
        <option value="" hidden>
          Select Category
        </option>
        {categoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}{" "}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        className="quantity-input"
        placeholder="Quantity"
        min="1"
      />
      <button type="submit" className="sub-btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};
