import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "./OrderDetailsSlice";

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
    <div className="orderhistory">
        <h4>Order Number: {orderId}</h4>
        <p>Total: {orderDetails.total}</p>
        <p>Shipping: {orderDetails.shipping}</p>
        <p>Tax: {orderDetails.tax}</p>
        {order.map(orderProduct => {
            return (
                <div>
                    <p>Product Name: {orderProduct.product.name}</p>
                    <p>Quantity: {orderProduct.productQty}</p>
                    <img src={orderProduct.product.imageUrl} />
                </div>
            );
        })}
    </div>
  );
};

export default SingleOrder;
