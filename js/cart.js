const CartItems = document.querySelector(".cart-items");

let cartTotal = 0;

function displayCartItems() {
  const items = JSON.parse(localStorage.getItem("cart"));
  
  if (items) {
    items.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart_item";
      cartItem.innerHTML = `
        <p class="cart_id">${item.id}</p>
        <p class="cart_title">${item.title}</p>
        <img src="${item.image}" alt="${item.title}" class="cart_img" />
        <p class="cart_price">${item.price}</p>
        <p class="cart_delete" onclick="deleteCartItem('${item.id}')"><i class="fa-solid fa-trash"></i></p>
      `;
      CartItems.appendChild(cartItem);
      cartTotal += parseFloat(item.price);
    });
  }
  updateCartTotal();
}

function deleteCartItem(itemId) {
  let items = JSON.parse(localStorage.getItem("cart"));
  items = items.filter(item => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(items));
  CartItems.innerHTML = ''; // Clear the cart display
  cartTotal = 0; // Reset cart total
  displayCartItems(); // Re-display cart items
}

function updateCartTotal() {
  const cartTotalElement = document.querySelector(".cart-total");
  cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
}

displayCartItems();
