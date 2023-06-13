import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = (props) => {
  const { name } = props;
  const { displayName } = props;
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (displayName === "Sign Up") {
      const email = evt.target.email.value;
      const address = evt.target.address.value;
      const cardNumber = evt.target.cardNumber.value;
      dispatch(authenticate({ method: formName, username, password, email, address, cardNumber }));
    } else {
      dispatch(authenticate({ method: formName, username, password }));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {displayName==="Sign Up"? 
          <div>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div>
                <label htmlFor="address">
                  <small>Address</small>
                </label>
                <input name="address" type="text" />
            </div>
            <div>
              <label htmlFor="cardNumber">
                <small>Card Number</small>
              </label>
              <input name="cardNumber" type="text" />
            </div>
          </div>
        : <></> }
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
