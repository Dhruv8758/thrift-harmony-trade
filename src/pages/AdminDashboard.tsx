
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
  X,
  Award,
  Thermometer,
  BarChart2
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
import { Badge } from "@/components/ui/badge";

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
  verificationStatus?: 'Verified' | 'Pending' | 'Unverified';
  healthScore?: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  
  const [users, setUsers] = useState<User[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [editSellerDialog, setEditSellerDialog] = useState(false);
  const [editProductDialog, setEditProductDialog] = useState(false);
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [addSellerDialog, setAddSellerDialog] = useState(false);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Add new state for verification dialog
  const [verificationDialog, setVerificationDialog] = useState(false);
  const [productToVerify, setProductToVerify] = useState<Product | null>(null);
  const [healthScoreDialog, setHealthScoreDialog] = useState(false);
  const [conditionComparisonDialog, setConditionComparisonDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    store: '',
    price: '',
    status: 'active',
    healthScore: '',
    verificationStatus: 'Pending' as 'Verified' | 'Pending' | 'Unverified'
  });
  
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      if (parsedUser.role !== "admin") {
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
      toast({
        title: "Authentication required",
        description: "Please sign in to access admin dashboard",
        variant: "destructive",
      });
      navigate("/sign-in");
    }
    
    loadMockData();
    setIsLoading(false);
  }, [navigate, toast]);
  
  const loadMockData = () => {
    setUsers([
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', memberSince: 'March 2023' },
      { id: '2', name: 'Alice Smith', email: 'alice@example.com', role: 'user', memberSince: 'June 2023' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', memberSince: 'September 2023' }
    ]);
    
    setSellers([
      { id: '1', name: 'SportsPro', store: 'Sports Equipment', products: 15, status: 'active' },
      { id: '2', name: 'ElectroGadgets', store: 'Electronics', products: 28, status: 'active' },
      { id: '3', name: 'HomeDecor', store: 'Home & Garden', products: 32, status: 'review' },
      { id: '4', name: 'TechHub', store: 'Technology', products: 45, status: 'suspended' }
    ]);
    
    setProducts([
      { 
        id: '1', 
        name: 'Professional Tennis Racket', 
        seller: 'SportsPro', 
        price: '₹12,000', 
        status: 'active',
        verificationStatus: 'Verified',
        healthScore: 92
      },
      { 
        id: '2', 
        name: 'Mechanical Keyboard', 
        seller: 'ElectroGadgets', 
        price: '₹7,500', 
        status: 'active',
        verificationStatus: 'Pending',
        healthScore: 87
      },
      { 
        id: '3', 
        name: 'Handmade Ceramic Vase', 
        seller: 'HomeDecor', 
        price: '₹3,750', 
        status: 'pending',
        verificationStatus: 'Unverified',
        healthScore: 75
      },
      { 
        id: '4', 
        name: 'Gaming Mouse', 
        seller: 'TechHub', 
        price: '₹4,500', 
        status: 'flagged',
        verificationStatus: 'Pending',
        healthScore: 60
      }
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
  
  const handleVerifyProduct = (product: Product) => {
    setProductToVerify(product);
    setFormData({
      ...formData,
      verificationStatus: product.verificationStatus || 'Pending'
    });
    setVerificationDialog(true);
  };
  
  const saveVerificationStatus = () => {
    if (!productToVerify) return;
    
    const updatedProducts = products.map(p => 
      p.id === productToVerify.id 
        ? { ...p, verificationStatus: formData.verificationStatus as 'Verified' | 'Pending' | 'Unverified' }
        : p
    );
    
    setProducts(updatedProducts);
    setVerificationDialog(false);
    toast({
      title: "Verification status updated",
      description: `Product has been marked as ${formData.verificationStatus}`
    });
  };
  
  const handleHealthScore = (product: Product) => {
    setProductToVerify(product);
    setFormData({
      ...formData,
      healthScore: product.healthScore?.toString() || '0'
    });
    setHealthScoreDialog(true);
  };
  
  const saveHealthScore = () => {
    if (!productToVerify) return;
    
    const updatedProducts = products.map(p => 
      p.id === productToVerify.id 
        ? { ...p, healthScore: parseInt(formData.healthScore || '0') }
        : p
    );
    
    setProducts(updatedProducts);
    setHealthScoreDialog(false);
    toast({
      title: "Health score updated",
      description: `Product health score set to ${formData.healthScore}`
    });
  };
  
  const handleConditionComparison = (product: Product) => {
    setProductToVerify(product);
    setConditionComparisonDialog(true);
  };
  
  const handleProductAction = (product: Product) => {
    let updatedStatus: 'active' | 'pending' | 'flagged';
    let message = '';
    
    if (product.status === 'active') {
      updatedStatus = 'flagged';
      message = 'Product has been flagged for review';
    } else if (product.status === 'flagged') {
      updatedStatus = 'active';
      message = 'Product has been activated';
    } else if (product.status === 'pending') {
      updatedStatus = 'active';
      message = 'Product has been approved and activated';
    } else {
      updatedStatus = 'active';
      message = 'Product status updated';
    }
    
    const updatedProducts = products.map(p => 
      p.id === product.id ? { ...p, status: updatedStatus } : p
    );
    
    setProducts(updatedProducts);
    toast({
      title: "Action completed",
      description: message
    });
  };
  
  const handleSellerAction = (seller: Seller) => {
    let updatedStatus: 'active' | 'review' | 'suspended';
    let message = '';
    
    if (seller.status === 'active') {
      updatedStatus = 'suspended';
      message = 'Seller has been suspended';
    } else if (seller.status === 'suspended') {
      updatedStatus = 'active';
      message = 'Seller has been unsuspended and is now active';
    } else if (seller.status === 'review') {
      updatedStatus = 'active';
      message = 'Seller has been approved';
    } else {
      updatedStatus = 'active';
      message = 'Seller status updated';
    }
    
    const updatedSellers = sellers.map(s => 
      s.id === seller.id ? { ...s, status: updatedStatus } : s
    );
    
    setSellers(updatedSellers);
    toast({
      title: "Action completed",
      description: message
    });
  };
  
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
                              
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className={
                                  seller.status === 'active' ? "text-red-500" : 
                                  seller.status === 'suspended' ? "text-green-500" : 
                                  "text-green-500"
                                }
                                onClick={() => handleSellerAction(seller)}
                              >
                                {seller.status === 'active' && (
                                  <>
                                    <AlertTriangle className="h-4 w-4 mr-1" />
                                    Suspend
                                  </>
                                )}
                                {seller.status === 'suspended' && (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Unsuspend
                                  </>
                                )}
                                {seller.status === 'review' && (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Approve
                                  </>
                                )}
                              </Button>
                              
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
                
                <TabsContent value="products" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Products Management</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-500">Manage all products on the platform</p>
                    <div className="flex space-x-2">
                      <Input type="text" placeholder="Search products..." className="border p-2 rounded-md" />
                      <Button>Search</Button>
                    </div>
                  </div>
                  
                  {/* Unique Features Banner */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Unique ScrapeGenie Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Authenticity Verification</p>
                          <p className="text-xs text-gray-500">Verify product authenticity</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Thermometer className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Product Health Score</p>
                          <p className="text-xs text-gray-500">Rate overall product condition</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <BarChart2 className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Condition Comparison</p>
                          <p className="text-xs text-gray-500">Compare with similar items</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Verification</TableHead>
                        <TableHead>Health</TableHead>
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
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                            )}
                            {product.status === 'pending' && (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                            )}
                            {product.status === 'flagged' && (
                              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Flagged</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {product.verificationStatus === 'Verified' && (
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {product.verificationStatus === 'Pending' && (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                            )}
                            {product.verificationStatus === 'Unverified' && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unverified</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`w-8 h-2 rounded-full mr-2 ${
                                (product.healthScore || 0) > 80 ? 'bg-green-500' :
                                (product.healthScore || 0) > 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                              <span>{product.healthScore || 0}</span>
                            </div>
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
                              
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className={
                                  product.status === 'active' ? "text-yellow-500" : 
                                  product.status === 'flagged' ? "text-green-500" : 
                                  "text-green-500"
                                }
                                onClick={() => handleProductAction(product)}
                              >
                                {product.status === 'active' && (
                                  <>
                                    <AlertTriangle className="h-4 w-4 mr-1" />
                                    Flag
                                  </>
                                )}
                                {product.status === 'flagged' && (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Activate
                                  </>
                                )}
                                {product.status === 'pending' && (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Approve
                                  </>
                                )}
                              </Button>
                              
                              <div className="flex space-x-1">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-green-600"
                                  onClick={() => handleVerifyProduct(product)}
                                  title="Verify product authenticity"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                                
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-blue-600"
                                  onClick={() => handleHealthScore(product)}
                                  title="Set product health score"
                                >
                                  <Thermometer className="h-4 w-4" />
                                </Button>
                                
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-purple-600"
                                  onClick={() => handleConditionComparison(product)}
                                  title="Condition comparison tool"
                                >
                                  <BarChart2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="analytics" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Site Analytics</h3>
                  <div className="mb-6 text-gray-500">Platform performance metrics</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-500 mb-1">Total Users</p>
                      <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-500 mb-1">Active Sellers</p>
                      <p className="text-2xl font-bold">{sellers.filter(s => s.status === 'active').length}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-500 mb-1">Total Products</p>
                      <p className="text-2xl font-bold">{products.length}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-500 mb-1">Pending Reviews</p>
                      <p className="text-2xl font-bold">
                        {products.filter(p => p.status === 'pending' || p.status === 'flagged').length}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-center py-10">
                    Detailed analytics dashboard is under development
                  </p>
                </TabsContent>
                
                <TabsContent value="settings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Site Settings</h3>
                  <p className="text-gray-500 mb-6">Configure platform settings</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">General Settings</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="siteName">Site Name</Label>
                          <Input type="text" id="siteName" defaultValue="ScrapeGenie" />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="siteDescription">Site Description</Label>
                          <Input 
                            type="text" 
                            id="siteDescription" 
                            defaultValue="A marketplace for second-hand goods with advanced verification tools" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-3">Product Verification</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable Product Verification</p>
                            <p className="text-sm text-gray-500">
                              Allow users to verify the condition of products
                            </p>
                          </div>
                          <input 
                            type="checkbox" 
                            defaultChecked 
                            className="h-5 w-5 rounded border-gray-300" 
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable Health Score</p>
                            <p className="text-sm text-gray-500">
                              Show product health score on listings
                            </p>
                          </div>
                          <input 
                            type="checkbox" 
                            defaultChecked 
                            className="h-5 w-5 rounded border-gray-300" 
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable Condition Comparison</p>
                            <p className="text-sm text-gray-500">
                              Allow users to compare product condition with similar items
                            </p>
                          </div>
                          <input 
                            type="checkbox" 
                            defaultChecked 
                            className="h-5 w-5 rounded border-gray-300" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Settings</Button>
                    </div>
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
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)}>
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
            <Button variant="outline" onClick={() => setEditUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveUserChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add User Dialog */}
      <Dialog open={addUserDialog} onOpenChange={setAddUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)}>
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
            <Button variant="outline" onClick={() => setAddUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveNewUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Seller Dialog */}
      <Dialog open={editSellerDialog} onOpenChange={setEditSellerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Seller</DialogTitle>
            <DialogDescription>Update seller information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="store">Store Name</Label>
              <Input 
                type="text" 
                id="store" 
                name="store" 
                value={formData.store} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSellerDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveSellerChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Seller Dialog */}
      <Dialog open={addSellerDialog} onOpenChange={setAddSellerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Seller</DialogTitle>
            <DialogDescription>Create a new seller account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="store">Store Name</Label>
              <Input 
                type="text" 
                id="store" 
                name="store" 
                value={formData.store} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSellerDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveNewSeller}>
              Add Seller
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={editProductDialog} onOpenChange={setEditProductDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input 
                type="text" 
                id="price" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
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
            <Button variant="outline" onClick={() => setEditProductDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveProductChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Verification Dialog */}
      <Dialog open={verificationDialog} onOpenChange={setVerificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Verification</DialogTitle>
            <DialogDescription>Update product verification status</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="verificationStatus">Verification Status</Label>
              <Select 
                value={formData.verificationStatus} 
                onValueChange={(value) => handleSelectChange('verificationStatus', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select verification status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVerificationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveVerificationStatus}>
              Save Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Health Score Dialog */}
      <Dialog open={healthScoreDialog} onOpenChange={setHealthScoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Health Score</DialogTitle>
            <DialogDescription>Set the product health score (0-100)</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="healthScore">Health Score</Label>
              <Input 
                type="number" 
                id="healthScore" 
                name="healthScore" 
                min="0"
                max="100"
                value={formData.healthScore} 
                onChange={handleInputChange} 
              />
              
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className={`h-2.5 rounded-full ${
                      parseInt(formData.healthScore || '0') > 80 ? 'bg-green-500' :
                      parseInt(formData.healthScore || '0') > 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${formData.healthScore || 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-red-500">Poor</span>
                  <span className="text-yellow-500">Good</span>
                  <span className="text-green-500">Excellent</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setHealthScoreDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveHealthScore}>
              Save Score
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Condition Comparison Dialog */}
      <Dialog open={conditionComparisonDialog} onOpenChange={setConditionComparisonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Condition Comparison Tool</DialogTitle>
            <DialogDescription>Compare condition with similar products</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Product: {productToVerify?.name}</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Similar items found:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Condition rank:</span>
                  <span className="font-medium">2 of 12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Compared to average:</span>
                  <span className="text-green-600 font-medium">Above average</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Condition comparison</p>
              <div className="relative h-10">
                <div className="absolute bottom-0 left-0 w-8 h-6 bg-red-200 rounded"></div>
                <div className="absolute bottom-0 left-10 w-8 h-7 bg-yellow-200 rounded"></div>
                <div className="absolute bottom-0 left-20 w-8 h-8 bg-green-200 rounded"></div>
                <div className="absolute bottom-0 left-30 w-8 h-10 bg-green-400 rounded">
                  <div className="absolute -top-7 left-0 text-xs font-bold bg-green-600 text-white px-1 py-0.5 rounded">
                    This item
                  </div>
                </div>
                <div className="absolute bottom-0 left-40 w-8 h-5 bg-yellow-200 rounded"></div>
                <div className="absolute bottom-0 left-50 w-8 h-3 bg-red-200 rounded"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setConditionComparisonDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
