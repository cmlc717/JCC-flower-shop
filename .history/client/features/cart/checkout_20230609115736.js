import React, { useState } from "react";

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
      {orderCompleted && (
        <div>
          <p>Order Completed!</p>
          <p>Order Number: {orderNumber}</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
