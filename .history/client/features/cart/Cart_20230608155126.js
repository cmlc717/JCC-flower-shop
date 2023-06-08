import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    // initial cart items
  ]);

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
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