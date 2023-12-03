import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const Form = ({ addProduct, initialData, setEditingProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 1,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        quantity: initialData.quantity || 1,
      });
    }
  }, [initialData]);

  const { name, category, quantity } = formData;

  const categoryOptions = ["electronics", "clothing", "groceries"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && category) {
      addProduct({ name, category, quantity });
      setFormData({
        name: "",
        category: "",
        quantity: 1,
      });
      setEditingProduct(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Form">
      <input
        type="text"
        value={name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="name-input"
        placeholder="Add product"
      />
      <select
        value={category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) =>
          setFormData({
            ...formData,
            quantity: parseInt(e.target.value, 10),
          })
        }
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
