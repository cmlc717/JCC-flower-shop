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
    let subtotal = 0;
    for (const item of cartItems) {
      const quantity = quantities[item.id] || 1; // Default to 1 if no quantity selected
      subtotal += item.price * quantity;
    }
    const tax = subtotal * 0.1;
    const shipping = 5.96;
    const total = subtotal + tax + shipping;
    return total.toFixed(2);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div>
          <ul id="cart-items">
            <li id="cart-header">
              <div className="cart-item-header">Flower</div>
              <div className="cart-item-header">Quantity</div>
              <div className="cart-item-header">Price</div>
            </li>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-name">{item.name}</div>
                <div>
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
                </div>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div id='cost-box'>
          <p>Subtotal: ${calculateTotal()}</p>
          <p>Tax (10%): ${(calculateTotal() * 0.1).toFixed(2)}</p>
          <p>Shipping: $5.95</p>
          <p>Total: ${(parseFloat(calculateTotal()) + 5.96).toFixed(2)}</p>
          <div/>
        </div>
      )}}
    </div>
  );
};

export default Cart;