import React, { useEffect } from "react";

/**
 * COMPONENT
 */
const SingleOrder = (props) => {
  const { order } = props;
  let orderId = order[0].orderId;
console.log(order)
  return (
    <div>
        <h4>Order Number: {orderId}</h4>
        {order.map(orderProduct => {
            return (
                <div>
                  {console.log(orderProduct.product.name)}
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
