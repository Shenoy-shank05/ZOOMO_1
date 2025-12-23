import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRestaurant = async () => {
      try {
        await api.get("/merchant/restaurants/me");
        // ✅ Restaurant exists → go to orders
        navigate("/orders", { replace: true });
      } catch (err) {
        // ❌ No restaurant → onboarding
        navigate("/onboarding", { replace: true });
      } finally {
        setChecking(false);
      }
    };

    checkRestaurant();
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return null;
}
