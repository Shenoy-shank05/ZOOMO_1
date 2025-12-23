import { useEffect, useState } from "react";
import DishCard from "../components/DishCard";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Menu() {
  const navigate = useNavigate();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch menu (merchant's own restaurant)
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get("/merchant/dishes");
        setDishes(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load menu"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Toggle availability
  const toggleAvailability = async (dishId) => {
    try {
      await api.patch(
        `/merchant/dishes/${dishId}/toggle`
      );

      setDishes((prev) =>
        prev.map((d) =>
          d.id === dishId
            ? { ...d, isAvailable: !d.isAvailable }
            : d
        )
      );
    } catch {
      alert("Failed to update availability");
    }
  };

  if (loading) {
    return (
      <div className="text-gray-500">
        Loading menu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menu</h1>

        <button
          onClick={() => navigate("/menu/add")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Add Dish
        </button>
      </div>

      {dishes.length === 0 ? (
        <p className="text-gray-500">
          No dishes added yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onEdit={() =>
                navigate(`/menu/edit/${dish.id}`)
              }
              onToggle={() =>
                toggleAvailability(dish.id)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
