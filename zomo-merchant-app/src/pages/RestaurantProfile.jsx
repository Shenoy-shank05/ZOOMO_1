import { useEffect, useState } from "react";
import RestaurantForm from "../components/RestaurantForm";
import api from "../services/api";

export default function RestaurantProfile() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch restaurant profile
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await api.get("/merchant/restaurants/me");
        setRestaurant(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load restaurant profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  // Save profile updates
  const saveProfile = async (data) => {
    setError("");
    try {
      await api.patch(
        `/merchant/restaurants/${restaurant.id}`,
        data
      );

      // Update local state after save
      setRestaurant((prev) => ({
        ...prev,
        ...data,
      }));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update restaurant profile"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading restaurant profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        Restaurant Profile
      </h1>

      <RestaurantForm
        restaurant={restaurant}
        onSubmit={saveProfile}
      />
    </div>
  );
}
