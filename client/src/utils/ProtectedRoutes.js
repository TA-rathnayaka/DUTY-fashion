import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const response = await axios.get("status");

const protectedRoutes = () => {
  const isAuthenticated = response.data.success;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default protectedRoutes;
