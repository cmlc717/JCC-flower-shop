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

  return (
    <div className="orderHistoryContainer">
      <h2 className="title">{username}'s order history</h2>
      {orderHistory.map((order) => <SingleOrder key={order.id} order={order}/>)}
    </div>
  );
};

export default OrderHistory;
