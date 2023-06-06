import React, { useEffect } from "react";

/**
 * COMPONENT
 */
const SingleOrder = (props) => {
  const { order } = props;
  let products = order.products;

  return (
    <div>
        <h4>Order Number: {order.number}</h4>
        {products.map(product => {
            return (
                <div>
                    <p>Product Name: {product.name}</p>
                    <img src={product.imageUrl} />
                </div>
            );
        })}
    </div>
  );
};

export default SingleOrder;
