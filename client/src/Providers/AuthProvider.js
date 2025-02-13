import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const apiUrl = process.env.REACT_APP_API_URL;

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/me`);
      setUser(response.data);
      return response.data;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const login = async (email, password) => {
    const data = { email, password };
    try {
      console.log(`${apiUrl}/login`);
      const response = await axios.post(`${apiUrl}/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const userData = {
          user_id: response.data.user_id,
          isAdmin: response.data.isAdmin,
        };
        setUser(userData);
        console.log(userData);
        return { success: true, message: "Sign in successful" };
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return {
          success: false,
          message: "Email already exists or invalid credentials",
        };
      } else {
        return {
          success: false,
          message: "There was an error signing in. Please try again.",
        };
      }
    }
  };

  const signup = async (firstName, lastName, email, password) => {
    const data = { firstName, lastName, email, password };
    try {
      const response = await axios.post(`${apiUrl}/signup`, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        return {
          success: true,
          message: "Signup successful. You can now log in.",
        };
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { success: false, message: "Email already exists" };
      } else {
        return {
          success: false,
          message: "There was an error signing up. Please try again.",
        };
      }
    }
  };
  const logout = () => {
    setUser(null);
    axios.post(`${apiUrl}/logout`);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
