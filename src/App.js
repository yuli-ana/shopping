import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Cart from "./Cart";
import Products from "./Products";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getProducts = async () => {
  const fetchProducts = await fetch("http://localhost:3000/api/products");
  const data = await fetchProducts.json();
  return data;
};

function App() {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await getProducts();
      console.log(products);
      setProducts(products);
    };

    getAllProducts();
  }, []);

  const addToCart = async (newProductId) => {
    const body = {
      productId: newProductId,
    };
    // Only if cart doesn't already exist, make this request
    if (!cartId) {
      const response = await fetch("http://localhost:3000/api/carts", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setCartId(data.id);
      // Cart
      setCartProducts(data.products);
      console.log(data);
    } else {
      const response = await fetch(
        `http://localhost:3000/api/carts/${cartId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      setCartProducts(data.products);
      console.log(data);
    }
  };

  return (
    <Router>
      <Link to="/cart">View your cart</Link>
      <Route
        exact
        path="/"
        render={() => <Products addToCart={addToCart} products={products} />}
      />
      <Route path="/cart" render={() => <Cart cartProducts={cartProducts} />} />
    </Router>
  );
}

export default App;
