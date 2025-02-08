import { createContext, useContext, useState } from "react";

// type AuthContext = {
//   currentUser: User | null,
//   handleLogin: () => Promise<Void>,
//   handleLogout: () => Promise<Void>,
// };

const AuthContext = createContext(null);

export default function AuthProvider({ children, isSignedIn = false }) {
  const [user] = useState(isSignedIn ? { id: 1 } : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
