import axios from "axios";

const URL = "http://localhost:5000";

const getAllProducts = (setProduct) => {
  axios
    .get(URL + "/items")
    .then(({ data }) => {
      const items = data.info || [];

      setProduct(items);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const addProduct = async (newItem, setProduct) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Unauthorized: User not logged in");
      return;
    }

    const response = await axios.post(URL + "/items", newItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const addedProduct = response.data.info;
    setProduct((prevProducts) => [...prevProducts, addedProduct]);
  } catch (error) {
    console.error("Error adding product:", error);
    return Promise.reject(error);
  }
};

const editProduct = async (productId, updatedItem, setProduct) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Unauthorized: User not logged in");
      return;
    }

    const response = await axios.put(URL + `/items/${productId}`, updatedItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Unauthorized: User not logged in");
      return;
    }

    await axios.delete(URL + `/items/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProduct((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return Promise.reject(error);
  }
};

const signup = async (email, password) => {
  try {
    const response = await axios.post(URL + "/users/signup", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    return Promise.reject(error);
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(URL + "/users/login", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    return Promise.reject(error);
  }
};

export {
  getAllProducts,
  addProduct,
  deleteProduct,
  editProduct,
  signup,
  login,
};
