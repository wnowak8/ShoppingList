import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import { Form } from "./Form";
import {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../utils/HandleApi";

export const Wrapper = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  const handleAddProduct = async (newItem) => {
    try {
      if (editingProduct) {
        console.log("In handleAddProduct newItem: ", editingProduct);
        await editProduct(editingProduct._id, newItem, setProducts);
        setEditingProduct(null);
      } else {
        await addProduct(newItem, setProducts);
      }
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    console.log("Logout successful");
  };

  return (
    <div className="Wrapper">
      <nav className="navbar">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="app-header">
        <h1>Shopping list</h1>
        <Form
          addProduct={handleAddProduct}
          initialData={editingProduct}
          setEditingProduct={setEditingProduct}
        />
      </div>
      <div className="product-header">
        <span>Name</span>
        <span className="category-span">Category</span>
        <span className="quantity-span">Quantity</span>
      </div>
      {console.log("Products:", products)}
      {products.map((product) => (
        <div key={product._id}>
          <Product
            item={product}
            deleteProduct={() => {
              deleteProduct(product._id, setProducts);
            }}
            editProduct={() => {
              console.log("Editing product with id:", product);
              setEditingProduct(product);
            }}
          />
        </div>
      ))}
      <div className="total">Total: {products.length}</div>
    </div>
  );
};
