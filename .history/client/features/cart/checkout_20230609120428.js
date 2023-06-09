import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to server or perform validation
    console.log("Form submitted:", creditCard);
    // Generate random order number
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
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit">Submit</button>
      </form>
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