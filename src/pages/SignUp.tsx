
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Mail, Lock, User, Github, Chrome } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const { signUp, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(name, email, password, role);
  };

  const handleSocialSignUp = (provider: string) => {
    // Mock social signup by using default values
    const socialName = provider === "GitHub" ? "GitHubUser" : "GoogleUser";
    const socialEmail = provider === "GitHub" ? "user@github.com" : "user@google.com";
    signUp(socialName, socialEmail, "password123", "user");
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
          <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Select defaultValue="user" onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Regular User</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Choose the type of account you want to create</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <Link to="/terms" className="text-scrapeGenie-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-scrapeGenie-600 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            
            <Button type="submit" className="w-full bg-scrapeGenie-600 hover:bg-scrapeGenie-700" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
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
              onClick={() => handleSocialSignUp("GitHub")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialSignUp("Google")}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          
          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-scrapeGenie-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
