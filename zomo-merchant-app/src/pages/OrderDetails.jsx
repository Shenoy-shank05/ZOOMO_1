import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import OrderStatusActions from "../components/OrderStatusActions";
import CancelOrderButton from "../components/CancelOrderButton";
import api from "../services/api";

export default function OrderDetails() {
  const { restaurantId, orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(
          `/merchant/restaurants/${restaurantId}/orders/${orderId}`
        );

        const o = res.data;

        setOrder({
          id: o.id,
          customerName: o.user?.name || "Customer",
          status: o.status,
          total: o.total,
          items: o.items.map((i) => ({
            name: i.dish.name,
            qty: i.quantity,
            price: i.price,
          })),
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load order"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [restaurantId, orderId]);

  const updateStatus = async (nextStatus) => {
    try {
      await api.patch(
        `/merchant/restaurants/${restaurantId}/orders/${orderId}/status`,
        { status: nextStatus }
      );

      setOrder((prev) => ({
        ...prev,
        status: nextStatus,
      }));
    } catch {
      alert("Failed to update order status");
    }
  };

  const cancelOrder = async () => {
    try {
      await api.patch(
        `/merchant/restaurants/${restaurantId}/orders/${orderId}/cancel`
      );

      setOrder((prev) => ({
        ...prev,
        status: "CANCELLED",
      }));
    } catch {
      alert("Failed to cancel order");
    }
  };

  if (loading)
    return (
      <p className="text-gray-500">
        Loading order details...
      </p>
    );

  if (error)
    return (
      <p className="text-red-500">{error}</p>
    );

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">
          Order #{order.id.slice(0, 6)}
        </h1>
        <StatusBadge status={order.status} />
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Customer: {order.customerName}
      </p>

      <div className="border-t pt-4 space-y-2">
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between text-sm"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-4 flex justify-between items-center">
        <div className="font-semibold">
          Total: ₹{order.total}
        </div>

        <div className="flex gap-2">
          <CancelOrderButton
            status={order.status}
            onCancel={cancelOrder}
          />
          <OrderStatusActions
            status={order.status}
            onUpdate={updateStatus}
          />
        </div>
      </div>
    </div>
  );
}
