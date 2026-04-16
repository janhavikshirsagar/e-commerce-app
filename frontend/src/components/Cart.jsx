import React, { useState } from "react";
import Navbar from "./Navbar";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // ➕ Increase quantity
  const increaseQty = (product) => {
    const updated = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ➖ Decrease quantity
  const decreaseQty = (product) => {
    const updated = cart
      .map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ❌ Remove item completely
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 💳 Buy Now
  const handleBuy = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    alert("Order placed successfully 🎉");

    setCart([]);
    localStorage.removeItem("cart");
  };

  // 💰 Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div>
      <Navbar cartCount={cart.length} />

      <div style={styles.container}>
        <h2>🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} style={styles.card}>
                <h4>{item.name}</h4>

                <p>
                  ₹{item.price} x {item.quantity || 1}
                </p>

                <div>
                  <button
                    style={styles.btn}
                    onClick={() => increaseQty(item)}
                  >
                    +
                  </button>

                  <button
                    style={styles.btn}
                    onClick={() => decreaseQty(item)}
                  >
                    -
                  </button>

                  <button
                    style={styles.removeBtn}
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h3>Total: ₹{total}</h3>

            <button style={styles.buyBtn} onClick={handleBuy}>
              Buy Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// 🎨 Styles
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    marginTop: "80px",
  },
  card: {
    border: "1px solid #eee",
    padding: "20px",
    margin: "15px auto",
    width: "260px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    background: "white",
  },
  btn: {
    margin: "5px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  removeBtn: {
    margin: "5px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    background: "red",
    color: "white",
    cursor: "pointer",
  },
  buyBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Cart;