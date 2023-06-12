import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const [guestCheckout, setGuestCheckout] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreditCard((prevCreditCard) => ({
      ...prevCreditCard,
      [name]: value,
    }));
  };

  const handleGuestInfoChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo((prevGuestInfo) => ({
      ...prevGuestInfo,
      [name]: value,
    }));
  };

  const handleGuestCheckout = () => {
    setGuestCheckout(true);
  };

  const handleUserLogin = (username) => {
    setUserLoggedIn(username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (guestCheckout) {
      console.log("Guest checkout:", {
        ...creditCard,
        ...guestInfo,
      });
    } else {
      console.log("Regular checkout:", creditCard);
    }

    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    setOrderCompleted(true);

    setCreditCard({
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
      cvv: "",
    });
    setGuestInfo({
      firstName: "",
      lastName: "",
      email: "",
    });
    // Clear the cart
    sessionStorage.removeItem("cart");
  };

  const generateOrderNumber = () => {
    // Generate a random order number
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `ORDER-${randomNumber}`;
  };

  return (
  <div>
    {!guestCheckout && !userLoggedIn && (
      <div>
        <h2>Checkout</h2>
        <div className="checkout-options">
          <div className="option sign-in-sign-up">
            <h3>Log In or Sign Up</h3>
            <p>Log in or create an account to proceed with the checkout.</p>
            <Link to="/login">Sign In</Link> | <Link to="/signup">Sign Up</Link>
          </div>
          <div className="option guest-checkout">
            <h3>Continue as Guest</h3>
            <p>Proceed with the checkout as a guest.</p>
            <button onClick={handleGuestCheckout}>Continue as Guest</button>
          </div>
        </div>
      </div>
    )}
    {guestCheckout && !userLoggedIn && (
      <div>
        <h2>Checkout</h2>
        <h2>Guest Checkout</h2>
        <form onSubmit={handleSubmit}>
          {/* Guest checkout form inputs */}
        </form>
      </div>
    )}
    {userLoggedIn && (
      <div>
        <h2>Checkout</h2>
        <h3>Welcome, {userLoggedIn}</h3>
        <p>Please proceed with your payment information.</p>
        <form onSubmit={handleSubmit}>
          {/* Payment information form inputs */}
        </form>
      </div>
    )}
    {orderCompleted && (
      <div>
        <h3>We got it!</h3>
        <h4>Order number: #{orderNumber}</h4>
        <p>Your package is being processed and will shortly be shipped.</p>
        <p>
          To check your order history, please click{" "}
          <Link to="/orderHistory">here</Link>.
        </p>
      </div>
    )}
  </div>
);
};

export default Checkout;