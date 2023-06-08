import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Checkout = () => {
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

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
    // Reset the form after submission
    setCreditCard({
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
      cvv: "",
    });
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = subtotal * 0.1;
    const shipping = 5.95;
    const total = subtotal + tax + shipping;
    return total.toFixed(2);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
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

      {/* Display the total amount */}
      <p>Total Amount: ${calculateTotal()}</p>
    </div>
  );
};

export default Checkout;