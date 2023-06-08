const handleRemoveItem = (productId) => {
  setQuantities((prevQuantities) => {
    const updatedQuantities = { ...prevQuantities };
    delete updatedQuantities[productId];
    return updatedQuantities;
  });

  // Remove the item from the cartItems array or Redux store
  const updatedCartItems = cartItems.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
};
In this updated code, the handleRemoveItem function first removes the quantity for the item from the quantities state, just like before. Then, it uses the filter method to create a new array updatedCartItems that includes all items except the one with the matching productId. Finally, it updates the cartItems in sessionStorage by converting updatedCartItems to a JSON string and storing it.

By making these changes, the item should be properly removed from the cart when you click the "X" button.





User
can you please rewrite it all?
ChatGPT
Certainly! Here's the updated code with the functionality to remove items from the cart:

jsx
Copy code
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/cartSlice";

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
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[productId];
      return updatedQuantities;
    });
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of cartItems) {
      const quantity = quantities[item.id] || 1; // Default to 1 if no quantity selected
      subtotal += item.price * quantity;
    }
    return subtotal.toFixed(2);
  };

  // Calculate total
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = subtotal * 0.1;
    const shipping = 5.95;
    const total = subtotal + tax + shipping;
    return total.toFixed(2);
  };

  return (
    <div>
      <h2 id="header-cart">Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div className="cart">
          <ul id="cart-items">
            <li id="cart-header">
              <div className="cart-item-header">Flower</div>
              <div className="cart-item-header">Quantity</div>
              <div className="cart-item-header">Price</div>
              <div className="cart-item-header">Remove</div>
            </li>
            {cartItems.map((item) => {
              const quantity = quantities[item.id] || 1; // Default to 1 if no quantity selected
              const totalPrice = item.price * quantity;

              return (
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
                  <div className="cart-item-price">
                    ${totalPrice.toFixed(2)}
                  </div>
                  <div>
                    <button onClick={() => handleRemoveItem(item.id)}>X</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div id="cost-box">
            <p>Subtotal: ${calculateSubtotal()}</p>
            <p>
              Tax (10%): ${(parseFloat(calculateSubtotal()) * 0.1).toFixed(2)}
            </p>
            <p>Shipping: $5.95</p>
            <p id="total-amount">Total: ${calculateTotal()}</p>
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;