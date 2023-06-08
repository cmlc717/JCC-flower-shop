import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../path/to/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // State to track quantities
  const [quantities, setQuantities] = useState({});

  // Function to update quantity for a product
  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // Calculate total
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of cartItems) {
      const quantity = quantities[item.id] || 1; // Default to 1 if no quantity selected
      subtotal += item.price * quantity;
    }
    return subtotal.toFixed(2);
  };

  // ... rest of the code

  return (
    <div>
      <h2 id="header-cart">Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div className="cart">
          <ul id="cart-items">
            <li id="cart-header">
              {/* ... */}
            </li>
            {cartItems.map((item) => {
              const quantity = quantities[item.id] || 1; // Default to 1 if no quantity selected
              const totalPrice = item.price * quantity;

              return (
                <li key={item.id} className="cart-item">
                  {/* ... */}
                  <div>
                    <button onClick={() => handleRemoveItem(item.id)}>X</button>
                  </div>
                </li>
              );
            })}
          </ul>
          {/* ... */}
        </div>
      )}
    </div>
  );
};

export default Cart;