import React, { useState } from "react";
import { Product } from "./Product";
import { Form } from "./Form";
import { v4 as uuidv4 } from "uuid";
import { EditForm } from "./EditForm";

export const Wrapper = () => {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([
      ...products,
      {
        id: uuidv4(),
        name: product.name,
        completed: false,
        isEditing: false,
        category: product.category || "",
        quantity: product.quantity || 1,
      },
    ]);
  };

  const deleteProduct = (id) => setProducts(products.filter((product) => product.id !== id));

  const toggleComplete = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, completed: !product.completed } : product
      )
    );
  };

  const editProduct = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, isEditing: !product.isEditing } : product
      )
    );
  };

  const editItem = (item, id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, item, isEditing: !product.isEditing } : product
      )
    );
  };

  return (
    <div className="Wrapper">
      <h1>Shopping list</h1>
      <Form addProduct={addProduct} />
      <div className="product-header">
        <span>Nazwa produktu</span>
        <span>Kategoria</span>
        <span>Ilość</span>
      </div>
      {products.map((product) =>
        product.isEditing ? (
          <EditForm editProduct={editItem} item={product} key={product.id} />
        ) : (
          <Product
            key={product.id}
            item={product}
            deletePproduct={deleteProduct}
            editProduct={editProduct}
            toggleComplete={toggleComplete}
          />
        )
      )}
      <div className="total">Total: {products.length}</div>
    </div>
  );
};
