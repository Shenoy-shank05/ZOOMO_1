// src/pages/Landing.jsx
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-white p-10 rounded-xl shadow-lg w-[420px] text-center">
      <h1 className="text-3xl font-bold text-red-500">ZOMO Merchant</h1>
      <p className="text-gray-600 mt-2">
        Manage orders, menu & restaurant in one place
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          to="/login"
          className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
        >
          Create Merchant Account
        </Link>
      </div>
    </div>
  );
}
