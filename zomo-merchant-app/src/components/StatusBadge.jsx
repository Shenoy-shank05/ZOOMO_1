export default function StatusBadge({ status }) {
  const colors = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PREPARING: "bg-blue-100 text-blue-700",
    READY_FOR_PICKUP: "bg-green-100 text-green-700",
    OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-gray-200 text-gray-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded font-medium ${
        colors[status] || "bg-gray-100"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
