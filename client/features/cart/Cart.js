import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = JSON.parse(sessionStorage.getItem('cart'));

  //calculate quantities
  
  //calculate total

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
