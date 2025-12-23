import { useNavigate, useLocation } from "react-router-dom";
import DishForm from "../components/DishForm";
import api from "../services/api";

export default function AddDish() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurantId = state?.restaurantId;

  const submit = async (data) => {
    await api.post("/merchant/dishes", data);
    navigate("/menu");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        Add Dish
      </h1>

      <DishForm onSubmit={submit} />
    </div>
  );
}
