import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleLogout = () => {
    navigate("/");
  };

  // 🔥 Fetch products from backend
  useEffect(() => {
  fetch("http://127.0.0.1:8000/products/")
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA:", data); // 👈 ADD THIS
      setProducts(data);
    });
}, []);

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <h2>Products</h2>

        <div style={styles.grid}>
          {products.map((p) => (
            <div key={p.id} style={styles.card}>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
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
};

export default Products;