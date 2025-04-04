
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Users, Settings, LogOut, Shield, Database, BarChart } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    // Check if the user is logged in and is an admin
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      if (parsedUser.role !== "admin") {
        // Redirect to sign in if not an admin
        toast({
          title: "Access denied",
          description: "You need admin privileges to access this page",
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
        description: "Please sign in to access admin dashboard",
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
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Manage all aspects of ScrapeGenie</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <Shield className="h-10 w-10 text-red-600" />
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500 text-sm">Administrator</p>
                  <p className="text-gray-500 text-sm">Member since {user.memberSince}</p>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("users")}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Users Management
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("sellers")}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Sellers Management
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("products")}
                  >
                    <Database className="mr-2 h-5 w-5" />
                    Products Management
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("analytics")}
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Site Analytics
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Site Settings
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
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="sellers">Sellers</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="users" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Users Management</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-500">Manage user accounts</p>
                    <Button>Add New User</Button>
                  </div>
                  
                  {/* Placeholder for users list */}
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Email</th>
                          <th className="text-left p-4">Role</th>
                          <th className="text-left p-4">Joined</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4">John Doe</td>
                          <td className="p-4">john@example.com</td>
                          <td className="p-4">User</td>
                          <td className="p-4">March 2023</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">Alice Smith</td>
                          <td className="p-4">alice@example.com</td>
                          <td className="p-4">User</td>
                          <td className="p-4">June 2023</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-4">Bob Johnson</td>
                          <td className="p-4">bob@example.com</td>
                          <td className="p-4">User</td>
                          <td className="p-4">September 2023</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="sellers" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Sellers Management</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-500">Manage seller accounts</p>
                    <Button>Add New Seller</Button>
                  </div>
                  
                  {/* Placeholder for sellers list */}
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Store</th>
                          <th className="text-left p-4">Products</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4">SportsPro</td>
                          <td className="p-4">Sports Equipment</td>
                          <td className="p-4">15</td>
                          <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span></td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="outline" className="text-red-500">Suspend</Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">ElectroGadgets</td>
                          <td className="p-4">Electronics</td>
                          <td className="p-4">28</td>
                          <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span></td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="outline" className="text-red-500">Suspend</Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-4">HomeDecor</td>
                          <td className="p-4">Home & Garden</td>
                          <td className="p-4">32</td>
                          <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Review</span></td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="outline" className="text-green-500">Approve</Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="products" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Products Management</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-500">Manage all products on the platform</p>
                    <div className="flex space-x-2">
                      <input type="text" placeholder="Search products..." className="border p-2 rounded-md" />
                      <Button>Search</Button>
                    </div>
                  </div>
                  
                  {/* Placeholder for products list */}
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="text-left p-4">Product</th>
                          <th className="text-left p-4">Seller</th>
                          <th className="text-left p-4">Price</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4">Professional Tennis Racket</td>
                          <td className="p-4">SportsPro</td>
                          <td className="p-4">₹12,000</td>
                          <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span></td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="outline" className="text-yellow-500">Flag</Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">Mechanical Keyboard</td>
                          <td className="p-4">ElectroGadgets</td>
                          <td className="p-4">₹7,500</td>
                          <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span></td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="outline" className="text-yellow-500">Flag</Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-4">Handmade Ceramic Vase</td>
                          <td className="p-4">HomeDecor</td>
                          <td className="p-4">₹3,750</td>
                          <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span></td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="outline" className="text-green-500">Approve</Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Site Analytics</h3>
                  <div className="mb-6 text-gray-500">Platform performance metrics</div>
                  
                  {/* Placeholder for analytics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="text-gray-500 text-sm mb-1">Total Users</h4>
                      <div className="text-2xl font-bold">1,245</div>
                      <div className="text-green-500 text-sm">+12% from last month</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="text-gray-500 text-sm mb-1">Active Sellers</h4>
                      <div className="text-2xl font-bold">126</div>
                      <div className="text-green-500 text-sm">+8% from last month</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="text-gray-500 text-sm mb-1">Total Products</h4>
                      <div className="text-2xl font-bold">3,890</div>
                      <div className="text-green-500 text-sm">+15% from last month</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="text-gray-500 text-sm mb-1">Total Orders</h4>
                      <div className="text-2xl font-bold">952</div>
                      <div className="text-green-500 text-sm">+10% from last month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="h-64 bg-gray-100 rounded-lg border flex items-center justify-center mb-6">
                      <p className="text-gray-500">User growth chart will appear here</p>
                    </div>
                    <div className="h-64 bg-gray-100 rounded-lg border flex items-center justify-center">
                      <p className="text-gray-500">Revenue chart will appear here</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Site Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">General Settings</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                          <input type="text" className="w-full p-2 border rounded-md" defaultValue="ScrapeGenie" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                          <textarea 
                            className="w-full p-2 border rounded-md" 
                            rows={3}
                            defaultValue="Marketplace for buying and selling products."
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="maintenance" />
                          <label htmlFor="maintenance" className="text-sm font-medium text-gray-700">Maintenance Mode</label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Email Settings</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Server</label>
                          <input type="text" className="w-full p-2 border rounded-md" placeholder="smtp.example.com" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Username</label>
                            <input type="text" className="w-full p-2 border rounded-md" placeholder="username" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
                            <input type="password" className="w-full p-2 border rounded-md" placeholder="••••••••" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Security Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="twoFactor" />
                          <label htmlFor="twoFactor" className="text-sm font-medium text-gray-700">Require Two-Factor Authentication for Admins</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="captcha" />
                          <label htmlFor="captcha" className="text-sm font-medium text-gray-700">Enable CAPTCHA on Forms</label>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="bg-scrapeGenie-600 hover:bg-scrapeGenie-700">Save Settings</Button>
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

export default AdminDashboard;
