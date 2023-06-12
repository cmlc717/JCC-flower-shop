export const addToStorage = (product) => {
  let currentCart = JSON.parse(sessionStorage.getItem('cart'));
  if (currentCart) {
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
    const updatedCart = currentCart.filter(item => item.id !== productId);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  }
};

export const updateStorage = (savedCart) => {
  let currentCart = JSON.parse(sessionStorage.getItem('cart'));
  if (!currentCart) {
    currentCart = [];
  }
  for (let i = 0; i < savedCart.length; i++) {
    let qty = savedCart[i].productQty;
    while (qty > 0) {
      currentCart.push(savedCart[i].product)
      qty--;
    }
  }
  sessionStorage.setItem("cart", JSON.stringify(currentCart));
}