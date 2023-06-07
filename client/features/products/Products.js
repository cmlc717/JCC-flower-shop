import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { addToCart } from "../features/cart/cartSlice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products from the server
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const addToCart = () => {
    // Fetch the product details from the server
    fetch("/api/products")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Product not found");
        }
      })
      .then((product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3> 
              {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
            </Link>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;