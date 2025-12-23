// src/pages/Signup.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.phone.length < 10) {
      setError("Enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      await signup(form);
      navigate("/dashboard"); // merchant dashboard
    } catch (err) {
      setError("Signup failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-8 rounded-xl shadow w-[380px]"
    >
      <h2 className="text-2xl font-bold mb-1">
        Create Merchant Account
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Start managing your restaurant on ZOMO
      </p>

      {error && (
        <p className="text-red-500 text-sm mb-3">
          {error}
        </p>
      )}

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 rounded mb-3"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email Address"
        className="w-full border p-2 rounded mb-3"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      {/* Phone */}
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full border p-2 rounded mb-3"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded mb-4"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}
