import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  console.log("Products component loaded");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const handleLogout = () => {
    navigate("/");
  };

  
  useEffect(() => {
  fetch("http://127.0.0.1:8000/products/")
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA:", data); 
      setProducts(data);
    });
}, []);

  const addToCart = (product) => {
  const updatedCart = [...cart, product];
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <Navbar cartCount={cart.length} />

      <div style={styles.container}>
        <h2>Products</h2>

        <div style={styles.grid}>
          {products.map((p) => (
            <div key={p.id} style={styles.card}>
              <h4 style={{ textTransform: "capitalize" }}>{p.name}</h4>
              <p>₹{p.price}</p>

              <button style={styles.button} onClick={() => addToCart(p)}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    marginTop: "80px",
  },
  grid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    minWidth: "150px",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Products;