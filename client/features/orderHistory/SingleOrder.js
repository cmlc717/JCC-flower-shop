import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "./OrderDetailsSlice";
import { v4 as uuidv4 } from 'uuid';

/**
 * COMPONENT
 */
const SingleOrder = (props) => {
  const { order } = props;
  let orderId = order[0].orderId;
  const orderDetails = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch]);

  return (
    <div className="orderhistory" id="orderBox">
        <h4>Order Number: {orderId}</h4>
        <p>Total: {orderDetails.total}</p>
        <p>Shipping: {orderDetails.shipping}</p>
        <p>Tax: {orderDetails.tax}</p>
        <h5>Products Ordered</h5>
        {order.map(orderProduct => {
            return (
                <div key={uuidv4()}>
                    <p>{orderProduct.product.name}</p>
                    <p>Quantity: {orderProduct.productQty}</p>
                    <img src={orderProduct.product.imageUrl} />
                </div>
            );
        })}
    </div>
  );
};

export default SingleOrder;
