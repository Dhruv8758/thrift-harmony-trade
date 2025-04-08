
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Users, 
  Settings, 
  LogOut, 
  Shield, 
  Database, 
  BarChart,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle2,
  X
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define types for users, sellers and products
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  memberSince: string;
}

interface Seller {
  id: string;
  name: string;
  store: string;
  products: number;
  status: 'active' | 'review' | 'suspended';
}

interface Product {
  id: string;
  name: string;
  seller: string;
  price: string;
  status: 'active' | 'pending' | 'flagged';
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  
  // State for data management
  const [users, setUsers] = useState<User[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Dialog states
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [editSellerDialog, setEditSellerDialog] = useState(false);
  const [editProductDialog, setEditProductDialog] = useState(false);
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [addSellerDialog, setAddSellerDialog] = useState(false);
  
  // Form states
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    store: '',
    price: '',
    status: 'active'
  });
  
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
    
    // Load mock data
    loadMockData();
    setIsLoading(false);
  }, [navigate, toast]);
  
  const loadMockData = () => {
    // Mock users data
    setUsers([
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', memberSince: 'March 2023' },
      { id: '2', name: 'Alice Smith', email: 'alice@example.com', role: 'user', memberSince: 'June 2023' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', memberSince: 'September 2023' }
    ]);
    
    // Mock sellers data
    setSellers([
      { id: '1', name: 'SportsPro', store: 'Sports Equipment', products: 15, status: 'active' },
      { id: '2', name: 'ElectroGadgets', store: 'Electronics', products: 28, status: 'active' },
      { id: '3', name: 'HomeDecor', store: 'Home & Garden', products: 32, status: 'review' },
      { id: '4', name: 'TechHub', store: 'Technology', products: 45, status: 'suspended' }
    ]);
    
    // Mock products data
    setProducts([
      { id: '1', name: 'Professional Tennis Racket', seller: 'SportsPro', price: '₹12,000', status: 'active' },
      { id: '2', name: 'Mechanical Keyboard', seller: 'ElectroGadgets', price: '₹7,500', status: 'active' },
      { id: '3', name: 'Handmade Ceramic Vase', seller: 'HomeDecor', price: '₹3,750', status: 'pending' },
      { id: '4', name: 'Gaming Mouse', seller: 'TechHub', price: '₹4,500', status: 'flagged' }
    ]);
  };

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
  
  // User management functions
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      ...formData,
      name: user.name,
      email: user.email,
      role: user.role
    });
    setEditUserDialog(true);
  };
  
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "The user has been removed successfully"
    });
  };
  
  const handleAddUser = () => {
    setFormData({
      ...formData,
      name: '',
      email: '',
      role: 'user'
    });
    setAddUserDialog(true);
  };
  
  const saveNewUser = () => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      memberSince: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    };
    setUsers([...users, newUser]);
    setAddUserDialog(false);
    toast({
      title: "User added",
      description: "New user has been added successfully"
    });
  };
  
  const saveUserChanges = () => {
    if (!editingUser) return;
    
    const updatedUsers = users.map(u => 
      u.id === editingUser.id 
        ? { ...u, name: formData.name, email: formData.email, role: formData.role }
        : u
    );
    
    setUsers(updatedUsers);
    setEditUserDialog(false);
    toast({
      title: "User updated",
      description: "User information has been updated successfully"
    });
  };
  
  // Seller management functions
  const handleEditSeller = (seller: Seller) => {
    setEditingSeller(seller);
    setFormData({
      ...formData,
      name: seller.name,
      store: seller.store,
      status: seller.status
    });
    setEditSellerDialog(true);
  };
  
  const handleDeleteSeller = (sellerId: string) => {
    setSellers(sellers.filter(seller => seller.id !== sellerId));
    toast({
      title: "Seller deleted",
      description: "The seller has been removed successfully"
    });
  };
  
  const handleAddSeller = () => {
    setFormData({
      ...formData,
      name: '',
      store: '',
      status: 'active'
    });
    setAddSellerDialog(true);
  };
  
  const saveNewSeller = () => {
    const newSeller: Seller = {
      id: (sellers.length + 1).toString(),
      name: formData.name,
      store: formData.store,
      products: 0,
      status: formData.status as 'active' | 'review' | 'suspended'
    };
    setSellers([...sellers, newSeller]);
    setAddSellerDialog(false);
    toast({
      title: "Seller added",
      description: "New seller has been added successfully"
    });
  };
  
  const saveSellerChanges = () => {
    if (!editingSeller) return;
    
    const updatedSellers = sellers.map(s => 
      s.id === editingSeller.id 
        ? { ...s, name: formData.name, store: formData.store, status: formData.status as 'active' | 'review' | 'suspended' }
        : s
    );
    
    setSellers(updatedSellers);
    setEditSellerDialog(false);
    toast({
      title: "Seller updated",
      description: "Seller information has been updated successfully"
    });
  };
  
  // Product management functions
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      ...formData,
      name: product.name,
      price: product.price.replace('₹', ''),
      status: product.status
    });
    setEditProductDialog(true);
  };
  
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Product deleted",
      description: "The product has been removed successfully"
    });
  };
  
  const saveProductChanges = () => {
    if (!editingProduct) return;
    
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id 
        ? { 
            ...p, 
            name: formData.name, 
            price: `₹${formData.price}`, 
            status: formData.status as 'active' | 'pending' | 'flagged' 
          }
        : p
    );
    
    setProducts(updatedProducts);
    setEditProductDialog(false);
    toast({
      title: "Product updated",
      description: "Product information has been updated successfully"
    });
  };
  
  const handleProductAction = (product: Product, action: string) => {
    let message = '';
    let updatedProducts = [...products];
    
    if (action === 'approve') {
      updatedProducts = products.map(p => 
        p.id === product.id ? { ...p, status: 'active' as 'active' } : p
      );
      message = 'Product has been approved and activated';
    } else if (action === 'flag') {
      updatedProducts = products.map(p => 
        p.id === product.id ? { ...p, status: 'flagged' as 'flagged' } : p
      );
      message = 'Product has been flagged for review';
    } else if (action === 'activate') {
      updatedProducts = products.map(p => 
        p.id === product.id ? { ...p, status: 'active' as 'active' } : p
      );
      message = 'Product has been activated';
    }
    
    setProducts(updatedProducts);
    toast({
      title: "Action completed",
      description: message
    });
  };
  
  const handleSellerAction = (seller: Seller, action: string) => {
    let message = '';
    let updatedSellers = [...sellers];
    
    if (action === 'approve') {
      updatedSellers = sellers.map(s => 
        s.id === seller.id ? { ...s, status: 'active' as 'active' } : s
      );
      message = 'Seller has been approved';
    } else if (action === 'suspend') {
      updatedSellers = sellers.map(s => 
        s.id === seller.id ? { ...s, status: 'suspended' as 'suspended' } : s
      );
      message = 'Seller has been suspended';
    } else if (action === 'unsuspend') {
      updatedSellers = sellers.map(s => 
        s.id === seller.id ? { ...s, status: 'active' as 'active' } : s
      );
      message = 'Seller has been unsuspended and is now active';
    }
    
    setSellers(updatedSellers);
    toast({
      title: "Action completed",
      description: message
    });
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
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
                
                {/* Users Tab */}
                <TabsContent value="users" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Users Management</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-500">Manage user accounts</p>
                    <Button onClick={handleAddUser}>Add New User</Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{user.memberSince}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditUser(user)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-500" 
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {/* Sellers Tab */}
                <TabsContent value="sellers" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Sellers Management</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-500">Manage seller accounts</p>
                    <Button onClick={handleAddSeller}>Add New Seller</Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Store</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sellers.map(seller => (
                        <TableRow key={seller.id}>
                          <TableCell>{seller.name}</TableCell>
                          <TableCell>{seller.store}</TableCell>
                          <TableCell>{seller.products}</TableCell>
                          <TableCell>
                            {seller.status === 'active' && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                            )}
                            {seller.status === 'review' && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Review</span>
                            )}
                            {seller.status === 'suspended' && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Suspended</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleEditSeller(seller)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              
                              {seller.status === 'review' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-green-500" 
                                  onClick={() => handleSellerAction(seller, 'approve')}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                              )}
                              
                              {seller.status === 'active' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-500" 
                                  onClick={() => handleSellerAction(seller, 'suspend')}
                                >
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Suspend
                                </Button>
                              )}
                              
                              {seller.status === 'suspended' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-green-500" 
                                  onClick={() => handleSellerAction(seller, 'unsuspend')}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Unsuspend
                                </Button>
                              )}
                              
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-500" 
                                onClick={() => handleDeleteSeller(seller.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {/* Products Tab */}
                <TabsContent value="products" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Products Management</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-500">Manage all products on the platform</p>
                    <div className="flex space-x-2">
                      <Input type="text" placeholder="Search products..." className="border p-2 rounded-md" />
                      <Button>Search</Button>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map(product => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.seller}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            {product.status === 'active' && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                            )}
                            {product.status === 'pending' && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                            )}
                            {product.status === 'flagged' && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Flagged</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              
                              {product.status === 'pending' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-green-500"
                                  onClick={() => handleProductAction(product, 'approve')}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                              )}
                              
                              {product.status === 'active' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-yellow-500"
                                  onClick={() => handleProductAction(product, 'flag')}
                                >
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Flag
                                </Button>
                              )}
                              
                              {product.status === 'flagged' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-green-500"
                                  onClick={() => handleProductAction(product, 'activate')}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Activate
                                </Button>
                              )}
                              
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-500"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {/* Analytics Tab */}
                <TabsContent value="analytics" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Site Analytics</h3>
                  <div className="mb-6 text-gray-500">Platform performance metrics</div>
                  
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
                    <Button className="mb-4">Generate Reports</Button>
                    <div className="h-64 bg-gray-100 rounded-lg border flex items-center justify-center mb-6">
                      <p className="text-gray-500">User growth chart will appear here</p>
                    </div>
                    <Button className="mb-4">Export Data</Button>
                    <div className="h-64 bg-gray-100 rounded-lg border flex items-center justify-center">
                      <p className="text-gray-500">Revenue chart will appear here</p>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Settings Tab */}
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
      
      {/* User Edit Dialog */}
      <Dialog open={editUserDialog} onOpenChange={setEditUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Make changes to user information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                value={formData.email} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserDialog(false)}>Cancel</Button>
            <Button onClick={saveUserChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add User Dialog */}
      <Dialog open={addUserDialog} onOpenChange={setAddUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Enter user information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                value={formData.email} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserDialog(false)}>Cancel</Button>
            <Button onClick={saveNewUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Seller Edit Dialog */}
      <Dialog open={editSellerDialog} onOpenChange={setEditSellerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Seller</DialogTitle>
            <DialogDescription>Make changes to seller information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store">Store</Label>
              <Input 
                id="store" 
                name="store"
                value={formData.store} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSellerDialog(false)}>Cancel</Button>
            <Button onClick={saveSellerChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Seller Dialog */}
      <Dialog open={addSellerDialog} onOpenChange={setAddSellerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Seller</DialogTitle>
            <DialogDescription>Enter seller information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store">Store</Label>
              <Input 
                id="store" 
                name="store"
                value={formData.store} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSellerDialog(false)}>Cancel</Button>
            <Button onClick={saveNewSeller}>Add Seller</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Product Edit Dialog */}
      <Dialog open={editProductDialog} onOpenChange={setEditProductDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Make changes to product information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input 
                id="price" 
                name="price"
                value={formData.price} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProductDialog(false)}>Cancel</Button>
            <Button onClick={saveProductChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
