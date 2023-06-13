import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "./userSlice";
import { Link } from "react-router-dom";

const User = () => {
  const username = useSelector((state) => state.auth.me.username);
  const userId = useSelector((state) => state.auth.me.id);
  const capitalizedUsername = username ? username.charAt(0).toUpperCase() + username.slice(1) : '';
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(fetchUserDetails(userId));
  }, []);

  return (
    <div id="homeContainer">
      <h2 className="title">
        🌷 {capitalizedUsername}'s Profile 🌷
      </h2>
      <div id="userProfile">
        <p>email: {userDetails.email}</p>
        <p>address: {userDetails.address}</p>
        <p>card number: {userDetails.cardNumber}</p>
        <button><Link to="/userProfile/edit">Edit Profile</Link></button>
      </div>
    </div>
  );
};

export default User;