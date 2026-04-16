import React, { useState } from "react";
import Navbar from "./Navbar";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Navbar cartCount={cart.length} />

      <div style={{ padding: "20px", textAlign: "center", marginTop: "80px" }}>
        <h2>Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} style={{ margin: "10px" }}>
                {item.name} - ₹{item.price}
                <button onClick={() => removeItem(index)}>
                  Remove
                </button>
              </div>
            ))}

            <h3>Total: ₹{total}</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;