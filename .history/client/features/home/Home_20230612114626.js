import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Products from "../products/Products";

const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div id="homeContainer">
      <h2 className="title">Hello, {username}!</h2>
      <Products />
    </div>
  );
};

export default Home;