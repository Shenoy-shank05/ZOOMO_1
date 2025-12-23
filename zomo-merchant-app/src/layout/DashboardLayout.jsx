import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold text-red-500">
          ZOMO Merchant
        </div>

        <nav className="flex flex-col gap-2 px-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `p-2 rounded ${
                isActive ? "bg-red-100 text-red-600" : "text-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/orders"
            className="p-2 rounded text-gray-700"
          >
            Orders
          </NavLink>

          <NavLink
            to="/menu"
            className="p-2 rounded text-gray-700"
          >
            Menu
          </NavLink>
          <NavLink
                   to="/restaurant"
                     className="p-2 rounded text-gray-700"
          >
            Restaurant
           </NavLink>

        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <span className="text-sm text-gray-600">
            Welcome, <strong>{user?.name}</strong>
          </span>

          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
