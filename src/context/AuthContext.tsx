import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string; // ✅ llave primaria única
  email: string;
  role: "admin" | "user";
  loginTime?: string;
}


interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("passkit_session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("passkit_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
