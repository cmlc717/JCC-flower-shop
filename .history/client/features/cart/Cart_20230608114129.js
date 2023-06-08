import React, { useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = JSON.parse(sessionStorage.getItem("cart"));

  // State to track quantities
  const [quantities, setQuantities] = useState({});

  // Function to update quantity for a product
  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  // Calculate total
  const calculateTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      const quantity = quantities[item.id] || 1; // Default to 1 if no quantity selected
      total += item.price * quantity;
    }
    return total;
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name}
                <select
                  value={quantities[item.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
          <p>Total: ${calculateTotal()}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;