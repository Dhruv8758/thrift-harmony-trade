
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Sell from "./pages/Sell";
import Categories from "./pages/Categories";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Trending from "./pages/Trending";
import NewArrivals from "./pages/NewArrivals";
import Deals from "./pages/Deals";
import StartSelling from "./pages/StartSelling";
import SellerTools from "./pages/SellerTools";
import SellerGuidelines from "./pages/SellerGuidelines";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import SimpleProducts from "./pages/SimpleProducts";
import Wishlist from "./pages/Wishlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/start-selling" element={<StartSelling />} />
            <Route path="/seller-tools" element={<SellerTools />} />
            <Route path="/seller-guidelines" element={<SellerGuidelines />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/simple-products" element={<SimpleProducts />} />
            
            {/* Protected routes - User only */}
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['user', 'seller', 'admin']}>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/wishlist" element={
              <ProtectedRoute allowedRoles={['user', 'seller', 'admin']}>
                <Wishlist />
              </ProtectedRoute>
            } />
            
            {/* Protected routes - Seller only */}
            <Route path="/seller-dashboard" element={
              <ProtectedRoute allowedRoles={['seller', 'admin']}>
                <SellerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/sell" element={
              <ProtectedRoute allowedRoles={['seller', 'admin']}>
                <Sell />
              </ProtectedRoute>
            } />
            
            {/* Protected routes - Admin only */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
