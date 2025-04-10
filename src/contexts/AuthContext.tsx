
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (name: string, email: string, password: string, role: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check for session in cookies first, then localStorage as fallback
    const rememberedEmail = getCookie("rememberedEmail");
    const rememberedPassword = getCookie("rememberedPassword");
    
    if (rememberedEmail && rememberedPassword) {
      // Auto sign in if credentials are found in cookies
      signIn(rememberedEmail, rememberedPassword, true);
    } else {
      // Check local storage for existing user session
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        try {
          setUser(JSON.parse(currentUser));
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          localStorage.removeItem('currentUser');
        }
      }
      setIsLoading(false);
    }

    // Add event listener for real-time auth state sync across tabs
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle login/logout events across tabs
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'currentUser') {
      if (e.newValue) {
        // Another tab logged in
        try {
          const parsedUser = JSON.parse(e.newValue);
          setUser(parsedUser);
          toast({
            title: "Session updated",
            description: `You are now signed in as ${parsedUser.name}`,
          });
        } catch (error) {
          console.error("Failed to parse user from storage event:", error);
        }
      } else {
        // Another tab logged out
        setUser(null);
        toast({
          title: "Session ended",
          description: "You have been signed out in another tab",
        });
        navigate("/sign-in");
      }
    }
  };

  // Check if user credentials are valid
  const validateUserCredentials = (email: string, password: string): boolean => {
    // In a real app, this would check against a database
    // For now, we'll accept any password that's at least 6 chars
    return email.includes('@') && password.length >= 6;
  }

  // Helper functions for cookie management
  const setCookie = (name: string, value: string, days: number = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const eraseCookie = (name: string) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  // Sign in function
  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      // Check if credentials are valid
      if (!validateUserCredentials(email, password)) {
        throw new Error("Invalid credentials");
      }
      
      // Check if the user exists in localStorage (simulating database check)
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (!existingUser) {
        throw new Error("Account not found. Please sign up first.");
      }
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create the user object from existing data
      const user = {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone || "",
        location: existingUser.location || "",
        role: existingUser.role as 'user' | 'seller' | 'admin',
        memberSince: existingUser.memberSince
      };
      
      // Store user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      // If remember me is checked, store credentials in cookies
      if (rememberMe) {
        setCookie("rememberedEmail", email);
        setCookie("rememberedPassword", password);
        localStorage.setItem("rememberedLogin", "true");
      }
      
      setUser(user);
      
      toast({
        title: "Sign in successful",
        description: `Welcome back to ScrapeGenie as a ${user.role}!`,
      });
      
      // Redirect based on role or return URL
      const from = location.state?.from || '/';
      
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/profile");
      }
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again",
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
      // Check if credentials are valid
      if (!validateUserCredentials(email, password)) {
        throw new Error("Invalid email or password too short (min 6 chars)");
      }
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (users.some((user: any) => user.email === email)) {
        throw new Error("Email already registered. Please sign in instead.");
      }
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const newUser = {
        name: name,
        email: email,
        password: password, // In a real app, this would be hashed
        phone: "", 
        location: "",
        role: role as 'user' | 'seller' | 'admin',
        memberSince: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long'
        })
      };
      
      // Store in "database" (localStorage)
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Auto sign-in the new user
      const user = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        location: newUser.location,
        role: newUser.role,
        memberSince: newUser.memberSince
      };
      
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Store credentials by default for new users
      setCookie("rememberedEmail", email);
      setCookie("rememberedPassword", password);
      localStorage.setItem("rememberedLogin", "true");
      
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
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Please check your information and try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    // Clear all stored authentication data
    localStorage.removeItem("currentUser");
    eraseCookie("rememberedEmail");
    eraseCookie("rememberedPassword");
    localStorage.removeItem("rememberedLogin");
    
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
