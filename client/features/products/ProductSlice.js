export const addToStorage = (product) => {
  let currentCart = JSON.parse(sessionStorage.getItem('cart'));
  if (currentCart) {
    console.log("in current cart")
    currentCart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(currentCart));
  } else {
    let cart = [product]
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
}

export const removeFromStorage = (productId) => {
  let currentCart = JSON.parse(sessionStorage.getItem('cart'));
  if (currentCart) {
    console.log("remove from cart");
    const updatedCart = currentCart.filter(item => item.id !== productId);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  }
};