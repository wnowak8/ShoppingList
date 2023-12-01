import axios from "axios";

const URL = "http://localhost:5000";

const getAllProducts = (setProduct) => {
  axios
    .get(URL + "/items")
    .then(({ data }) => {
      console.log("data:", data);

      const items = data.info || [];

      setProduct(items);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const addProduct = async (newItem, setProduct) => {
  try {
    const response = await axios.post(URL + "/items", newItem);
    const addedProduct = response.data.info;
    setProduct((prevProducts) => [...prevProducts, addedProduct]);
  } catch (error) {
    console.error("Error adding product:", error);
    return Promise.reject(error);
  }
};

const editProduct = async (productId, updatedItem, setProduct) => {
  try {
    const response = await axios.put(URL + `/items/${productId}`, updatedItem);
    const editedProduct = response.data.info;
    setProduct((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? editedProduct : product
      )
    );
  } catch (error) {
    console.error("Error editing product:", error);
    return Promise.reject(error);
  }
};



const deleteProduct = async (productId, setProduct) => {
  try {
    await axios.delete(URL + `/items/${productId}`);
    setProduct((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return Promise.reject(error);
  }
};


export { getAllProducts, addProduct, deleteProduct, editProduct };
