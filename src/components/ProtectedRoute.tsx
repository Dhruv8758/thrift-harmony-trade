
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('user' | 'seller' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-t-2 border-scrapeGenie-600 border-solid rounded-full animate-spin mx-auto"></div>
        <p className="ml-2">Loading...</p>
      </div>
    );
  }
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    toast({
      title: "Authentication required",
      description: "Please sign in to access this page",
      variant: "destructive",
    });
    return <Navigate to="/sign-in" replace />;
  }
  
  // Check role authorization
  if (user && !allowedRoles.includes(user.role)) {
    toast({
      title: "Access denied",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    
    // Redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (user.role === 'seller') {
      return <Navigate to="/seller-dashboard" replace />;
    } else {
      return <Navigate to="/profile" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
