import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderHistoryAsync } from "./OrderHistorySlice";
import SingleOrder from "./SingleOrder";

/**
 * COMPONENT
 */
const OrderHistory = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const id = useSelector((state) => state.auth.me.id);
  const orderHistory = useSelector((state) => state.orderHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderHistoryAsync(id));
  }, [dispatch]);
console.log(orderHistory)
  return (
    <div>
      <h3>{username}'s order history</h3>
      {orderHistory.map((order) => <SingleOrder key={order.id} order={order}/>)}
    </div>
  );
};

export default OrderHistory;
