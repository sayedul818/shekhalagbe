
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    const storedUser = localStorage.getItem("lms_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // For demo purposes, we'll use a mock authentication
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - In a real app, this would be an API call
      const mockUser: User = {
        id: "user123",
        name: email.split("@")[0],
        email,
        role: email.includes("admin") ? "admin" : email.includes("teacher") ? "teacher" : "student",
        createdAt: new Date().toISOString(),
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem("lms_user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Mock registration - In a real app, this would be an API call
      const mockUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem("lms_user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("lms_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
