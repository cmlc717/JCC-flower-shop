import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUserDetails } from "./userSlice";

const EditUser = () => {
    const userDetails = useSelector((state) => state.userDetails);
    const userId = useSelector((state) => state.auth.me.id);
    const dispatch = useDispatch();
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        const email = evt.target.email.value;
        const address = evt.target.address.value;
        const cardNumber = evt.target.cardNumber.value;
        let valid = validateForm(username, password, email, address, cardNumber);
        if (valid) {
            dispatch(editUserDetails({userId, username, password, email, address, cardNumber }));
        } else {
          alert("Please fill out form with appropriate data");
        }
    };
  
    const validateForm = (username, password, email, address, cardNumber) => {
      let valid = true;
      if (!email.includes("@") || !email.includes(".")) {
        valid = false;
      }
  
      if (typeof username != "string") {
        valid = false;
      }
  
      if (typeof password != "string") {
        valid = false;
      }
  
      if (address && typeof address != "string") {
        valid = false;
      }
  
      if (typeof Number(cardNumber) != "number") {
        valid = false;
      }
  
      return valid;
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
            <div>
                <label htmlFor="username">
                    <small>Username</small>
                </label>
                <input name="username" type="text" defaultValue={userDetails.username} required/>
            </div>
            <div>
                <label htmlFor="password">
                    <small>Password</small>
                </label>
                <input name="password" type="password" defaultValue={userDetails.password} required/>
            </div>
            <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="email" defaultValue={userDetails.email} />
            </div>
            <div>
                <label htmlFor="address">
                    <small>Address</small>
                </label>
                <input name="address" type="text" defaultValue={userDetails.address}/>
            </div>
            <div>
                <label htmlFor="cardNumber">
                  <small>Card Number</small>
                </label>
                <input name="cardNumber" type="text" defaultValue={userDetails.cardNumber}/>
            </div>
            <div>
                <button type="submit">Confirm</button>
            </div>
        </form>
      </div>
    );
  };
  
  export default EditUser;