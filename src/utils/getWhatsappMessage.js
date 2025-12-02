export const getWhatsappMessage = () => {
  if (typeof window === "undefined") return "";

  let cart = JSON.parse(localStorage.getItem("shopping-cart") || "[]");

  // Si no es un array, intentamos detectar dónde está la lista de items
  if (!Array.isArray(cart)) {
    // Caso 1: { items: [...] }
    if (Array.isArray(cart.items)) {
      cart = cart.items;
    }
    // Caso 2: { cart: [...] }
    else if (Array.isArray(cart.cart)) {
      cart = cart.cart;
    }
    // Caso 3: { products: [...] }
    else if (Array.isArray(cart.products)) {
      cart = cart.products;
    }
    // Caso 4: { state: { cart: [...] } }
    else if (cart.state && Array.isArray(cart.state.cart)) {
      cart = cart.state.cart;
    }
    else {
      return encodeURIComponent("No se pudo leer el carrito.");
    }
  }

  if (cart.length === 0) {
    return encodeURIComponent("Tu carrito está vacío.");
  }

  let message = "🛒 *Resumen de tu orden:*\n\n";

  cart.forEach((item) => {
    message += `• ${item.title} (x${item.quantity}) - $${item.price}\n`;
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  message += `\n💰 *Total:* $${total}\n\n`;
  message += "Gracias por tu compra 🙌";

  return encodeURIComponent(message);
};
