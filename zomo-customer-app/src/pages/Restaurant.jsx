import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import ThemeContext from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dark } = useContext(ThemeContext);
  const {
    cart,
    addToCart,
    restaurantConflict,
    confirmReplaceCart,
    cancelReplaceCart,
  } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load restaurant + dishes
  useEffect(() => {
    async function load() {
      const res = await api.get(`/restaurants/${id}`);
      setRestaurant(res);

      const dishRes = await api.get(`/dishes?restaurantId=${id}`);
      setDishes(dishRes);

      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-xl">Loading...</div>;

  return (
    <div
      className={`min-h-screen transition-colors ${
        dark ? "bg-black" : "bg-[#f7fff9]"
      }`}
    >
      {/* Restaurant Banner */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={
            restaurant.imageUrl || "https://source.unsplash.com/1200x600/?restaurant"
          }
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Name & Info */}
        <div className="absolute bottom-5 left-6 text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg">{restaurant.name}</h1>
          <p className="opacity-90 text-sm">{restaurant.description}</p>
        </div>
      </div>

      {/* Menu Title */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Menu
        </h2>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-24">
          {dishes.map((dish) => {
            const qty = cart?.items?.find((i) => i.dish?.id === dish.id)?.quantity || 0;

            return (
              <div
                key={dish.id}
                className="rounded-3xl p-4 ring-1 ring-black/10 dark:ring-white/10 
                           bg-white/90 dark:bg-[#0f0f0f]/80 backdrop-blur-xl 
                           shadow-md hover:shadow-xl transition hover:-translate-y-1"
              >
                {/* Dish Info */}
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {dish.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      {dish.description}
                    </p>
                    <p className="mt-2 font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{dish.price}
                    </p>
                  </div>

                  <img
                    src={
                      dish.imageUrl ||
                      "https://source.unsplash.com/150x150/?food,dish"
                    }
                    className="w-20 h-20 rounded-xl object-cover ml-3"
                  />
                </div>

                {/* Add / Update Buttons */}
                <div className="mt-4">
                  {qty === 0 ? (
                    <button
                      className="w-full bg-emerald-600 text-white py-2 rounded-xl 
                                 font-semibold hover:brightness-110 transition"
                      onClick={() => addToCart(dish.id)}
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-100 dark:bg-white/10 p-2 rounded-xl">
                      <button
                        className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-xl 
                                   text-lg font-bold"
                        onClick={() => addToCart(dish.id)}
                      >
                        -
                      </button>

                      <span className="text-lg font-semibold dark:text-white">
                        {qty}
                      </span>

                      <button
                        className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-xl 
                                   text-lg font-bold"
                        onClick={() => addToCart(dish.id)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Restaurant Conflict Modal */}
      {restaurantConflict && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Replace Cart?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your cart contains items from another restaurant. Adding this item
              will reset your cart. Do you want to proceed?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={cancelReplaceCart}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                onClick={confirmReplaceCart}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Footer for Total Items */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white dark:bg-black p-4 shadow-lg
                   flex items-center justify-between z-50"
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          Total Items: {cart.items.reduce((total, item) => total + item.quantity, 0)}
        </span>
        <button
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold
                     hover:brightness-110 active:scale-95 transition"
          onClick={() => navigate("/cart")}
        >
          View Cart &rarr;
        </button>
      </div>
    </div>
  );
}
