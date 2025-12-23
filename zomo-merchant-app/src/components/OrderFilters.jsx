import { ORDER_FILTERS } from "../utils/orderFilters";

export default function OrderFilters({ active, onChange }) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {Object.entries(ORDER_FILTERS).map(([key, filter]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-3 py-1 rounded text-sm border ${
            active === key
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
