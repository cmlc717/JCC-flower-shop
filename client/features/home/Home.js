import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Products from "../products/Products";
// import { addToCart } from "../features/cart/cartSlice";

const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Hello, {username}</h3>
      <Products />
    </div>
  );
};

export default Home;