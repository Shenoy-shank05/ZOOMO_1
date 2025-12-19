import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const [restaurantConflict, setRestaurantConflict] = useState(null);
  // { newDishId, newRestaurantId }

  // Load cart when logged in
  useEffect(() => {
    if (!isAuthenticated) {
      setCart(null);
      setLoading(false);
      return;
    }
    loadCart();
  }, [isAuthenticated]);

  async function loadCart() {
    try {
      const res = await api.get("/cart");
      setCart(res);
    } catch (err) {
      console.error("Cart load failed:", err);
    } finally {
      setLoading(false);
    }
  }

  // User accepts replacing restaurant
  async function confirmReplaceCart() {
    if (!restaurantConflict) return;

    const { newDishId } = restaurantConflict;
    setRestaurantConflict(null);

    await clearCart();
    await addToCart(newDishId); // add fresh item
  }

  // User cancels replacing cart
  function cancelReplaceCart() {
    setRestaurantConflict(null);
  }

  // Add item to cart
  async function addToCart(dishId) {
    try {
      const dish = await api.get(`/dishes/${dishId}`);

      if (!dish) return;

      const newRestaurantId = dish.restaurantId;

      // If cart exists and restaurant isn't same → show popup
      if (cart?.items?.length > 0 && cart?.items[0].dish.restaurantId !== newRestaurantId) {
        setRestaurantConflict({ newDishId: dishId, newRestaurantId });
        return;
      }

      await api.post("/cart/items", { dishId, quantity: 1 });
      await loadCart();
    } catch (error) {
      console.error("Add failed:", error);
    }
  }

  async function clearCart() {
    try {
      await api.delete("/cart");
      await loadCart();
    } catch (error) {
      console.error("Clear cart failed:", error);
    }
  }

  async function increaseQuantity(item) {
    await api.patch(`/cart/items/${item.id}`, {
      quantity: item.quantity + 1,
    });
    await loadCart();
  }

  async function decreaseQuantity(item) {
    if (item.quantity === 1) {
      await removeItem(item.id);
      return;
    }
    await api.patch(`/cart/items/${item.id}`, {
      quantity: item.quantity - 1,
    });
    await loadCart();
  }

  async function removeItem(id) {
    await api.delete(`/cart/items/${id}`);
    await loadCart();
  }

  function getTotalItemCount() {
    return cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  }

  function getSubtotal() {
    return (
      cart?.items?.reduce(
        (sum, item) => sum + item.quantity * item.dish.price,
        0
      ) || 0
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        loadCart,
        getSubtotal,
        getTotalItemCount,

        restaurantConflict,
        confirmReplaceCart,
        cancelReplaceCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
