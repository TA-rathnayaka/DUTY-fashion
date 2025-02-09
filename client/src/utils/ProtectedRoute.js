import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, loading]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : null;
};
