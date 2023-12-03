import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import { Form } from "./Form";
import {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../utils/HandleApi";

export const Wrapper = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  const handleAddProduct = async (newItem) => {
    try {
      if (editingProduct) {
        console.log("In handleAddProduct newItem: ", editingProduct);
        // If editingProduct is present, update the existing product
        await editProduct(editingProduct._id, newItem, setProducts);
        setEditingProduct(null); // Clear editingProduct after update

      } else {
        // If no editingProduct, add a new product
        await addProduct(newItem, setProducts);
      }
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  return (
    <div className="Wrapper">
      <h1>Shopping list</h1>
      <Form
        addProduct={handleAddProduct}
        initialData={editingProduct}
        setEditingProduct={setEditingProduct}
      />
      <div className="product-header">
        <span>Nazwa produktu</span>
        <span>Kategoria</span>
        <span>Ilość</span>
      </div>
      {console.log('Products:', products)}
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
