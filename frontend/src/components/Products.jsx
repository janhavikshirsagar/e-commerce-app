import Navbar from "./Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

 return (
  <div>
    <Navbar />

    <div style={styles.container}>
      <h2>Products</h2>

      <div style={styles.grid}>
        <div style={styles.card}>Product 1 - ₹500</div>
        <div style={styles.card}>Product 2 - ₹800</div>
        <div style={styles.card}>Product 3 - ₹1200</div>
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
  logout: {
    marginBottom: "20px",
    padding: "10px",
  },
  grid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  },
};

export default Products;
