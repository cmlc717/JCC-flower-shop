import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  
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
    // Reset the form after submission
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
      {!guestCheckout && (
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
         {isLoggedIn && (
        <div>
          <h2>Guest Checkout</h2>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={guestInfo.firstName}
                onChange={handleGuestInfoChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={guestInfo.lastName}
                onChange={handleGuestInfoChange}
              />
            </label>
            <br />
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={guestInfo.email}
                onChange={handleGuestInfoChange}
              />
            </label>
            <br />
            <h3>Payment Information</h3>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={creditCard.cardNumber}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Card Holder:
              <input
                type="text"
                name="cardHolder"
                value={creditCard.cardHolder}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Expiration Date:
              <input
                type="text"
                name="expirationDate"
                value={creditCard.expirationDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              CVV:
              <input
                type="text"
                name="cvv"
                value={creditCard.cvv}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {guestCheckout && (
        <div>
          <h2>Guest Checkout</h2>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={guestInfo.firstName}
                onChange={handleGuestInfoChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={guestInfo.lastName}
                onChange={handleGuestInfoChange}
              />
            </label>
            <br />
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={guestInfo.email}
                onChange={handleGuestInfoChange}
              />
            </label>
            <br />
            <h3>Payment Information</h3>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={creditCard.cardNumber}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Card Holder:
              <input
                type="text"
                name="cardHolder"
                value={creditCard.cardHolder}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Expiration Date:
              <input
                type="text"
                name="expirationDate"
                value={creditCard.expirationDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              CVV:
              <input
                type="text"
                name="cvv"
                value={creditCard.cvv}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
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