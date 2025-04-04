
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Package, Settings, LogOut, BarChart, DollarSign, MessageSquare, Bell } from "lucide-react";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");

  useEffect(() => {
    // Check if the user is logged in and is a seller
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      if (parsedUser.role !== "seller") {
        // Redirect to sign in if not a seller
        toast({
          title: "Access denied",
          description: "You need a seller account to access this page",
          variant: "destructive",
        });
        navigate("/sign-in");
        return;
      }
      setUser(parsedUser);
    } else {
      // Redirect to sign in if not logged in
      toast({
        title: "Authentication required",
        description: "Please sign in to access seller dashboard",
        variant: "destructive",
      });
      navigate("/sign-in");
    }
    setIsLoading(false);
  }, [navigate, toast]);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/sign-in");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-t-2 border-scrapeGenie-600 border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading dashboard...</p>
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Seller Dashboard</h1>
            <p className="text-gray-500">Manage your products and sales</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-scrapeGenie-100 flex items-center justify-center mb-4">
                    <DollarSign className="h-10 w-10 text-scrapeGenie-600" />
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500 text-sm">Seller Account</p>
                  <p className="text-gray-500 text-sm">Member since {user.memberSince}</p>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("listings")}
                  >
                    <Package className="mr-2 h-5 w-5" />
                    My Products
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("orders")}
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Sales Analytics
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Messages
                    <span className="ml-auto bg-scrapeGenie-100 text-scrapeGenie-600 text-xs px-2 py-1 rounded-full">3</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                    <span className="ml-auto bg-scrapeGenie-100 text-scrapeGenie-600 text-xs px-2 py-1 rounded-full">5</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4">
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-6">
                  <TabsTrigger value="listings">My Products</TabsTrigger>
                  <TabsTrigger value="orders">Sales Analytics</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="listings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">My Products</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-500">Manage your product listings</p>
                    <Button onClick={() => navigate("/sell")}>Add New Product</Button>
                  </div>
                  
                  {/* Placeholder for product listings */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                      <div className="font-medium">Professional Tennis Racket</div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                      </div>
                    </div>
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="font-medium">Cast Iron Dutch Oven</div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="font-medium">Remote Control Drone</div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="orders" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Sales Analytics</h3>
                  <div className="text-gray-500 mb-6">Track your sales performance</div>
                  
                  {/* Placeholder for analytics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="text-gray-500 text-sm mb-1">Total Sales</h4>
                      <div className="text-2xl font-bold">₹45,250</div>
                      <div className="text-green-500 text-sm">+15% from last month</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="text-gray-500 text-sm mb-1">Orders</h4>
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-green-500 text-sm">+8% from last month</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="text-gray-500 text-sm mb-1">Average Order Value</h4>
                      <div className="text-2xl font-bold">₹1,885</div>
                      <div className="text-green-500 text-sm">+5% from last month</div>
                    </div>
                  </div>
                  
                  <div className="h-64 bg-gray-100 rounded-lg border flex items-center justify-center">
                    <p className="text-gray-500">Sales chart will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="messages" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Messages</h3>
                  <div className="text-gray-500 mb-6">Communicate with your customers</div>
                  
                  {/* Placeholder for messages */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4 border-b flex items-start space-x-4">
                      <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-blue-600">JD</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div className="font-medium">John Doe</div>
                          <div className="text-sm text-gray-500">Yesterday</div>
                        </div>
                        <p className="text-gray-600">Is the tennis racket still available? I'm interested in purchasing it.</p>
                      </div>
                    </div>
                    <div className="p-4 border-b flex items-start space-x-4 bg-gray-50">
                      <div className="rounded-full bg-purple-100 h-10 w-10 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-purple-600">AS</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div className="font-medium">Alice Smith</div>
                          <div className="text-sm text-gray-500">2 days ago</div>
                        </div>
                        <p className="text-gray-600">Do you offer international shipping for the Dutch Oven?</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-start space-x-4">
                      <div className="rounded-full bg-green-100 h-10 w-10 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-green-600">RJ</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div className="font-medium">Robert Johnson</div>
                          <div className="text-sm text-gray-500">1 week ago</div>
                        </div>
                        <p className="text-gray-600">Thanks for the quick delivery of the drone! Works perfectly.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Notifications</h3>
                  <div className="text-gray-500 mb-6">Stay updated on your account activity</div>
                  
                  {/* Placeholder for notifications */}
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg flex items-start space-x-4 bg-blue-50">
                      <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">New Order Received</div>
                        <p className="text-gray-600 text-sm">You have received a new order for the Professional Tennis Racket.</p>
                        <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-start space-x-4">
                      <div className="rounded-full bg-green-100 h-10 w-10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">New Message</div>
                        <p className="text-gray-600 text-sm">John Doe sent you a message about the tennis racket.</p>
                        <div className="text-xs text-gray-500 mt-1">Yesterday</div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg flex items-start space-x-4">
                      <div className="rounded-full bg-yellow-100 h-10 w-10 flex items-center justify-center flex-shrink-0">
                        <Bell className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">Payment Received</div>
                        <p className="text-gray-600 text-sm">You received a payment of ₹1,500 for the Cast Iron Dutch Oven.</p>
                        <div className="text-xs text-gray-500 mt-1">3 days ago</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Personal Information</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" className="w-full p-2 border rounded-md" defaultValue={user.name} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full p-2 border rounded-md" defaultValue={user.email} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input type="tel" className="w-full p-2 border rounded-md" defaultValue={user.phone || ""} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" className="w-full p-2 border rounded-md" defaultValue={user.location || ""} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Store Information</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                          <input type="text" className="w-full p-2 border rounded-md" defaultValue="Your Store Name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
                          <textarea 
                            className="w-full p-2 border rounded-md" 
                            rows={3}
                            defaultValue="We sell high-quality products at affordable prices."
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Payment Information</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
                        <input type="text" className="w-full p-2 border rounded-md" placeholder="Add your bank account" />
                      </div>
                    </div>
                    
                    <Button className="bg-scrapeGenie-600 hover:bg-scrapeGenie-700">Save Changes</Button>
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

export default SellerDashboard;
