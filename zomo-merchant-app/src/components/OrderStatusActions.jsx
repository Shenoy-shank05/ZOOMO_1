import { STATUS_FLOW, isTerminalStatus } from "../utils/orderStatus";

export default function OrderStatusActions({ status, onUpdate }) {
  if (isTerminalStatus(status)) return null;

  const action = STATUS_FLOW[status];
  if (!action) return null;

  return (
    <button
      onClick={() => onUpdate(action.next)}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      {action.label}
    </button>
  );
}
