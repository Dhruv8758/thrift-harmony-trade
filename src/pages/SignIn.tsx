
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Mail, Lock, Github, Chrome } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sign in with different roles based on email
    setTimeout(() => {
      let role = "user"; // Default role
      
      // Mock role assignment based on email
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
        role: role, // Include role
        memberSince: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long'
        })
      };
      
      // Store user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      setIsLoading(false);
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
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social sign in
    setTimeout(() => {
      // Create a mock user object for social login
      const user = {
        name: provider === "GitHub" ? "GitHubUser" : "GoogleUser",
        email: `user@${provider.toLowerCase()}.com`,
        phone: "+1 123-456-7890", // Mock phone number
        location: "San Francisco, USA", // Mock location
        role: "user", // Default role for social login
        memberSince: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long'
        })
      };
      
      // Store user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      setIsLoading(false);
      toast({
        title: `${provider} sign in successful`,
        description: "Welcome to ScrapeGenie!",
      });
      navigate("/profile");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-md">
        <Link to="/" className="inline-flex items-center text-sm mb-6 text-gray-500 hover:text-scrapeGenie-600">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
        
        <div className="bg-white p-8 rounded-lg border shadow-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In to ScrapeGenie</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Try these emails for different roles:<br/>
                <span className="font-medium">user@example.com</span> - Regular user<br/>
                <span className="font-medium">seller@example.com</span> - Seller<br/>
                <span className="font-medium">admin@example.com</span> - Admin
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-scrapeGenie-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">Remember me for 30 days</Label>
            </div>
            
            <Button type="submit" className="w-full bg-scrapeGenie-600 hover:bg-scrapeGenie-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="relative my-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-xs text-gray-500">OR CONTINUE WITH</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialLogin("GitHub")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          
          <div className="mt-6 space-y-4">
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-scrapeGenie-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
            
            <div className="text-center">
              <Link to="/sign-up" className="w-full inline-block">
                <Button variant="outline" className="w-full">
                  Create new account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
