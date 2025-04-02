
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// In a real app, this would come from an authentication system
const getCurrentUser = () => {
  const storedUser = localStorage.getItem("currentUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  // Redirect to sign in if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to view your profile",
        variant: "destructive",
      });
      navigate("/sign-in");
    }
  }, [isLoading, user, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/sign-in");
  };

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-t-2 border-scrapeGenie-600 border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-scrapeGenie-100 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-scrapeGenie-600" />
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-gray-500 text-sm">Member since {user.memberSince || "March 2023"}</p>
                </div>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <div className="cursor-pointer">
                      <Package className="mr-2 h-5 w-5" />
                      My Orders
                    </div>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <div className="cursor-pointer">
                      <Heart className="mr-2 h-5 w-5" />
                      Favorites
                    </div>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <div className="cursor-pointer">
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </div>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" 
                    onClick={handleSignOut}
                  >
                    <div className="cursor-pointer flex items-center">
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign Out
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="md:w-3/4">
              <Tabs defaultValue="listings">
                <TabsList className="mb-6">
                  <TabsTrigger value="listings">My Listings</TabsTrigger>
                  <TabsTrigger value="purchases">My Purchases</TabsTrigger>
                  <TabsTrigger value="settings">Account Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="listings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">My Listings</h3>
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-2">You haven't listed any items yet</p>
                    <Button onClick={() => navigate("/sell")}>List an Item</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="purchases" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">My Purchases</h3>
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-2">You haven't purchased any items yet</p>
                    <Button onClick={() => navigate("/")}>Start Shopping</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Name</h4>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p>{user.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p>{user.location || "Not provided"}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
