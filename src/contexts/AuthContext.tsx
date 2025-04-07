
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

// Define user interface
interface User {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: 'user' | 'seller' | 'admin';
  memberSince: string;
}

// Define context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, role: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check local storage for existing user session
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    setIsLoading(false);
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine role based on email (mock implementation)
      let role = "user"; // Default role
      
      if (email.includes("admin")) {
        role = "admin";
      } else if (email.includes("seller")) {
        role = "seller";
      }
      
      // Create a mock user object
      const user = {
        name: email.split('@')[0], // Extract name from email
        email: email,
        phone: "+1 123-456-7890", // Mock phone number
        location: "New York, USA", // Mock location
        role: role as 'user' | 'seller' | 'admin', // Include role
        memberSince: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long'
        })
      };
      
      // Store user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);
      
      toast({
        title: "Sign in successful",
        description: `Welcome back to ScrapeGenie as a ${role}!`,
      });
      
      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string, role: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const user = {
        name: name,
        email: email,
        phone: "", // Empty for new users
        location: "", // Empty for new users
        role: role as 'user' | 'seller' | 'admin',
        memberSince: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long'
        })
      };
      
      // Store user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);
      
      toast({
        title: "Account created successfully",
        description: `Welcome to ScrapeGenie as a ${role}!`,
      });
      
      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "Please check your information and try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/sign-in");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
