export default function DishCard({ dish, onEdit, onToggle }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{dish.name}</h3>
          <p className="text-sm text-gray-500">{dish.description}</p>

          <p className="mt-1 font-semibold">₹{dish.price}</p>

          <div className="text-xs text-gray-500 mt-1">
            {dish.isVegetarian && "🌱 Veg "}
            {dish.isVegan && "🥬 Vegan "}
            {dish.isGlutenFree && "🚫 Gluten "}
          </div>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded ${
            dish.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {dish.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="text-sm border px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={onToggle}
          className="text-sm border px-3 py-1 rounded"
        >
          {dish.isAvailable ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
}
