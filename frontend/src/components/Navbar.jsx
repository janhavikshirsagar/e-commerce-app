import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.nav}>
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/products")}>
        MyShop
      </h3>

      <div>
        <button onClick={() => navigate("/products")} style={styles.btn}>
          Products
        </button>

        <button onClick={() => navigate("/")} style={styles.btn}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "black",
    color: "white",
  },
  btn: {
    marginLeft: "10px",
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default Navbar;
