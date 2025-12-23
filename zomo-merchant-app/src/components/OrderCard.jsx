import StatusBadge from "./StatusBadge";

export default function OrderCard({ order, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 bg-white shadow-sm hover:shadow cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">
            Order #{order.id.slice(0, 6)}
          </h3>
          <p className="text-sm text-gray-500">
            {order.customerName}
          </p>
        </div>

        <StatusBadge status={order.status} />
      </div>

      <div className="mt-3 flex justify-between text-sm text-gray-600">
        <span>{order.items.length} items</span>
        <span className="font-semibold">₹{order.total}</span>
      </div>
    </div>
  );
}
