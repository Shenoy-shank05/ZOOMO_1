import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/users/me")
      .then((res) => setUser(res))          // api wrapper returns res.data
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  // LOGIN
  const login = async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });

    // Backend returns token + user
    const token = res.token || res.access_token || res.data?.token;
    const userData = res.user || res.data?.user;

    if (!token) throw new Error("Token missing from server");

    localStorage.setItem("token", token);
    setUser(userData);

    return userData;
  };

  // SIGNUP
  const signup = async (form) => {
    return await api.post("/auth/signup", form);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
