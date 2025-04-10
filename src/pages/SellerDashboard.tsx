
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Package, 
  Settings, 
  LogOut, 
  BarChart, 
  DollarSign, 
  MessageSquare, 
  Bell, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle,
  X,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Product } from "@/types/product";

// Define interfaces for seller dashboard
interface Message {
  id: string;
  from: string;
  avatar: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Order {
  id: string;
  product: string;
  customer: string;
  price: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

interface Payment {
  id: string;
  amount: string;
  from: string;
  for: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface SellerProduct extends Product {
  dateAdded: string;
  statusText: 'Active' | 'Draft' | 'Pending Review';
  views: number;
  likes: number;
}

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");

  // Product management state
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<SellerProduct | null>(null);
  const [productForm, setProductForm] = useState({
    id: '',
    title: '',
    price: 0,
    image: '',
    condition: 'New' as 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor',
    category: '',
    description: '',
    statusText: 'Active' as 'Active' | 'Draft' | 'Pending Review'
  });

  // Messages state
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatusDialog, setOrderStatusDialog] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  
  // Payments state
  const [payments, setPayments] = useState<Payment[]>([]);

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

    // Load mock data
    loadMockData();
    setIsLoading(false);
  }, [navigate, toast]);

  const loadMockData = () => {
    // Mock products
    const mockProducts: SellerProduct[] = [
      {
        id: '1',
        title: 'Professional Tennis Racket',
        price: 12000,
        image: '/placeholder.svg',
        condition: 'New',
        seller: {
          name: 'Your Store',
          rating: 4.8
        },
        category: 'Sports & Outdoors',
        description: 'Professional grade tennis racket with carbon fiber frame. Perfect for advanced players.',
        dateAdded: '2023-12-15',
        statusText: 'Active',
        views: 245,
        likes: 18,
        verificationStatus: 'Verified',
        healthScore: 95
      },
      {
        id: '2',
        title: 'Cast Iron Dutch Oven',
        price: 3500,
        image: '/placeholder.svg',
        condition: 'Like New',
        seller: {
          name: 'Your Store',
          rating: 4.8
        },
        category: 'Kitchen',
        description: 'Heavy duty cast iron dutch oven. Pre-seasoned and ready to use.',
        dateAdded: '2024-01-22',
        statusText: 'Active',
        views: 187,
        likes: 12,
        verificationStatus: 'Verified',
        healthScore: 90
      },
      {
        id: '3',
        title: 'Remote Control Drone',
        price: 8999,
        image: '/placeholder.svg',
        condition: 'Good',
        seller: {
          name: 'Your Store',
          rating: 4.8
        },
        category: 'Electronics',
        description: 'High-performance drone with 4K camera and 30-minute flight time.',
        dateAdded: '2024-02-18',
        statusText: 'Draft',
        views: 0,
        likes: 0,
        verificationStatus: 'Pending',
        healthScore: 85
      }
    ];
    
    setProducts(mockProducts);
    
    // Mock messages
    setMessages([
      {
        id: '1', 
        from: 'John Doe',
        avatar: 'JD',
        content: 'Is the tennis racket still available? I\'m interested in purchasing it.',
        timestamp: 'Today, 10:35 AM',
        read: false
      },
      {
        id: '2', 
        from: 'Alice Smith',
        avatar: 'AS',
        content: 'Do you offer international shipping for the Dutch Oven?',
        timestamp: 'Yesterday, 4:20 PM',
        read: true
      },
      {
        id: '3', 
        from: 'Robert Johnson',
        avatar: 'RJ',
        content: 'Thanks for the quick delivery of the drone! Works perfectly.',
        timestamp: '2 days ago',
        read: true
      }
    ]);
    
    // Mock orders
    setOrders([
      {
        id: 'ORD-1001',
        product: 'Professional Tennis Racket',
        customer: 'Amit Patel',
        price: '₹12,000',
        status: 'pending',
        date: 'Today'
      },
      {
        id: 'ORD-1002',
        product: 'Cast Iron Dutch Oven',
        customer: 'Priya Sharma',
        price: '₹3,500',
        status: 'shipped',
        date: 'Yesterday'
      },
      {
        id: 'ORD-998',
        product: 'Wireless Bluetooth Headphones',
        customer: 'Rahul Verma',
        price: '₹4,200',
        status: 'delivered',
        date: 'Mar 25, 2024'
      }
    ]);
    
    // Mock payments
    setPayments([
      {
        id: 'PAY-2001',
        amount: '₹11,400',
        from: 'Amit Patel',
        for: 'Professional Tennis Racket',
        date: 'Today',
        status: 'completed'
      },
      {
        id: 'PAY-2002',
        amount: '₹3,325',
        from: 'Priya Sharma',
        for: 'Cast Iron Dutch Oven',
        date: 'Yesterday',
        status: 'completed'
      },
      {
        id: 'PAY-1998',
        amount: '₹3,990',
        from: 'Rahul Verma',
        for: 'Wireless Bluetooth Headphones',
        date: 'Mar 25, 2024',
        status: 'completed'
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

  // Product management functions
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setProductForm({
      id: '',
      title: '',
      price: 0,
      image: '',
      condition: 'New',
      category: '',
      description: '',
      statusText: 'Active'
    });
    setProductDialog(true);
  };

  const handleEditProduct = (product: SellerProduct) => {
    setCurrentProduct(product);
    setProductForm({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      condition: product.condition,
      category: product.category,
      description: product.description || '',
      statusText: product.statusText
    });
    setProductDialog(true);
  };

  const handleDeleteProductConfirm = (product: SellerProduct) => {
    setCurrentProduct(product);
    setDeleteProductDialog(true);
  };

  const confirmDeleteProduct = () => {
    if (!currentProduct) return;
    
    setProducts(products.filter(p => p.id !== currentProduct.id));
    setDeleteProductDialog(false);
    
    // Broadcast the change to all tabs/windows
    localStorage.setItem('product_deleted', JSON.stringify({
      id: currentProduct.id,
      timestamp: new Date().getTime()
    }));
    
    toast({
      title: "Product deleted",
      description: "Your product has been successfully removed",
    });
  };

  const handleProductFormChange = (field: string, value: string | number) => {
    setProductForm({
      ...productForm,
      [field]: value
    });
  };

  const saveProduct = () => {
    const { id, title, price, condition, category, description, statusText } = productForm;
    
    if (!title || price <= 0 || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (currentProduct) {
      // Edit existing product
      const updatedProducts = products.map(product => 
        product.id === currentProduct.id ? {
          ...product,
          title,
          price: Number(price),
          condition: condition as 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor',
          category,
          description,
          statusText: statusText as 'Active' | 'Draft' | 'Pending Review'
        } : product
      );
      
      setProducts(updatedProducts);
      
      // Broadcast the change to all tabs/windows
      localStorage.setItem('product_updated', JSON.stringify({
        product: {
          id: currentProduct.id,
          title,
          price: Number(price),
          condition,
          category,
          description,
          statusText
        },
        timestamp: new Date().getTime()
      }));
      
      toast({
        title: "Product updated",
        description: "Your product has been successfully updated",
      });
    } else {
      // Add new product
      const newProduct: SellerProduct = {
        id: `${Date.now()}`,
        title,
        price: Number(price),
        image: '/placeholder.svg',
        condition: condition as 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor',
        seller: {
          name: user.name,
          rating: 0
        },
        category,
        description,
        dateAdded: new Date().toISOString().split('T')[0],
        statusText: statusText as 'Active' | 'Draft' | 'Pending Review',
        views: 0,
        likes: 0,
        verificationStatus: 'Pending',
        healthScore: 0
      };
      
      setProducts([newProduct, ...products]);
      
      // Broadcast the change to all tabs/windows
      localStorage.setItem('product_added', JSON.stringify({
        product: newProduct,
        timestamp: new Date().getTime()
      }));
      
      toast({
        title: "Product added",
        description: "Your product has been successfully listed",
      });
    }
    
    setProductDialog(false);
  };

  // Message management functions
  const handleViewMessage = (message: Message) => {
    // Mark as read
    const updatedMessages = messages.map(m => 
      m.id === message.id ? { ...m, read: true } : m
    );
    setMessages(updatedMessages);
    setCurrentMessage(message);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !currentMessage) return;
    
    toast({
      title: "Reply sent",
      description: `Your reply to ${currentMessage.from} has been sent`,
    });
    
    setReplyText('');
    setCurrentMessage(null);
  };

  // Order management functions
  const handleUpdateOrderStatus = (order: Order) => {
    setCurrentOrder(order);
    setOrderStatusDialog(true);
  };

  const updateOrderStatus = (status: 'pending' | 'shipped' | 'delivered' | 'cancelled') => {
    if (!currentOrder) return;
    
    const updatedOrders = orders.map(o => 
      o.id === currentOrder.id ? { ...o, status } : o
    );
    
    setOrders(updatedOrders);
    setOrderStatusDialog(false);
    
    toast({
      title: "Order updated",
      description: `Order #${currentOrder.id} has been marked as ${status}`,
    });
  };

  // Add listener for real-time updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'product_updated' && e.newValue) {
        const { product, timestamp } = JSON.parse(e.newValue);
        
        // Only update if we're not the source of this update
        if (timestamp !== localStorage.getItem('last_update_timestamp')) {
          setProducts(currentProducts => 
            currentProducts.map(p => 
              p.id === product.id ? { ...p, ...product } : p
            )
          );
          
          toast({
            title: "Product updated",
            description: `${product.title} has been updated`,
          });
        }
      }
      
      if (e.key === 'product_added' && e.newValue) {
        const { product, timestamp } = JSON.parse(e.newValue);
        
        // Only update if we're not the source of this update
        if (timestamp !== localStorage.getItem('last_update_timestamp')) {
          setProducts(currentProducts => [product, ...currentProducts]);
          
          toast({
            title: "Product added",
            description: `${product.title} has been added to your listings`,
          });
        }
      }
      
      if (e.key === 'product_deleted' && e.newValue) {
        const { id, timestamp } = JSON.parse(e.newValue);
        
        // Only update if we're not the source of this update
        if (timestamp !== localStorage.getItem('last_update_timestamp')) {
          const productToDelete = products.find(p => p.id === id);
          if (productToDelete) {
            setProducts(currentProducts => 
              currentProducts.filter(p => p.id !== id)
            );
            
            toast({
              title: "Product removed",
              description: `A product has been removed from your listings`,
            });
          }
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [products, toast]);

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
                    <span className="ml-auto bg-scrapeGenie-100 text-scrapeGenie-600 text-xs px-2 py-1 rounded-full">{products.length}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("orders")}
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Orders
                    <span className="ml-auto bg-scrapeGenie-100 text-scrapeGenie-600 text-xs px-2 py-1 rounded-full">{orders.filter(o => o.status === 'pending').length}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("payments")}
                  >
                    <DollarSign className="mr-2 h-5 w-5" />
                    Payments
                    <span className="ml-auto bg-scrapeGenie-100 text-scrapeGenie-600 text-xs px-2 py-1 rounded-full">{payments.length}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Messages
                    <span className="ml-auto bg-scrapeGenie-100 text-scrapeGenie-600 text-xs px-2 py-1 rounded-full">{messages.filter(m => !m.read).length}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("analytics")}
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Analytics
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
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                {/* Products Tab */}
                <TabsContent value="listings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">My Products</h3>
                    <Button onClick={handleAddProduct}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Product
                    </Button>
                  </div>

                  {products.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed">
                      <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h4 className="text-lg font-medium text-gray-900 mb-1">No products yet</h4>
                      <p className="text-gray-500 mb-4">Start selling by adding your first product</p>
                      <Button onClick={handleAddProduct}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Added On</TableHead>
                            <TableHead>Stats</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map(product => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 bg-gray-100 rounded-md mr-3 overflow-hidden">
                                    <img 
                                      src={product.image || '/placeholder.svg'} 
                                      alt={product.title}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium">{product.title}</p>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>₹{product.price.toLocaleString()}</TableCell>
                              <TableCell>
                                {product.statusText === 'Active' && (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                                )}
                                {product.statusText === 'Draft' && (
                                  <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
                                )}
                                {product.statusText === 'Pending Review' && (
                                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Review</Badge>
                                )}
                              </TableCell>
                              <TableCell>{product.dateAdded}</TableCell>
                              <TableCell>
                                <div className="text-xs text-gray-500">
                                  <p>{product.views} views</p>
                                  <p>{product.likes} likes</p>
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
                                    className="text-red-500" 
                                    onClick={() => handleDeleteProductConfirm(product)}
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
                    </div>
                  )}
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-6">Orders</h3>
                  
                  {orders.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed">
                      <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h4 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h4>
                      <p className="text-gray-500">Orders will appear here when customers make purchases</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map(order => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.product}</TableCell>
                              <TableCell>{order.customer}</TableCell>
                              <TableCell>{order.price}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>
                                {order.status === 'pending' && (
                                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                                )}
                                {order.status === 'shipped' && (
                                  <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shipped</Badge>
                                )}
                                {order.status === 'delivered' && (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>
                                )}
                                {order.status === 'cancelled' && (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUpdateOrderStatus(order)}
                                >
                                  Update Status
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
                
                {/* Payments Tab */}
                <TabsContent value="payments" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-6">Payments</h3>
                  
                  {payments.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed">
                      <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h4 className="text-lg font-medium text-gray-900 mb-1">No payments yet</h4>
                      <p className="text-gray-500">Payments will appear here after customers complete purchases</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Payment ID</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>For</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {payments.map(payment => (
                            <TableRow key={payment.id}>
                              <TableCell className="font-medium">{payment.id}</TableCell>
                              <TableCell>{payment.amount}</TableCell>
                              <TableCell>{payment.from}</TableCell>
                              <TableCell>{payment.for}</TableCell>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell>
                                {payment.status === 'completed' && (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                                )}
                                {payment.status === 'pending' && (
                                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                                )}
                                {payment.status === 'failed' && (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
                
                {/* Messages Tab */}
                <TabsContent value="messages" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-6">Messages</h3>
                  
                  {messages.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h4 className="text-lg font-medium text-gray-900 mb-1">No messages yet</h4>
                      <p className="text-gray-500">Messages from customers will appear here</p>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row gap-4 h-[500px]">
                      <div className="md:w-1/3 border rounded-lg overflow-hidden">
                        <div className="p-3 bg-gray-50 border-b">
                          <Input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full"
                            prefix={<Search className="h-4 w-4 text-gray-500" />}
                          />
                        </div>
                        <div className="overflow-y-auto h-[calc(500px-54px)]">
                          {messages.map((message) => (
                            <div 
                              key={message.id}
                              className={`p-3 border-b cursor-pointer ${
                                currentMessage?.id === message.id 
                                  ? 'bg-scrapeGenie-50' 
                                  : message.read ? 'bg-white' : 'bg-blue-50'
                              } hover:bg-gray-50`}
                              onClick={() => handleViewMessage(message)}
                            >
                              <div className="flex items-center mb-1">
                                <div className="h-8 w-8 rounded-full bg-scrapeGenie-100 flex items-center justify-center mr-2 flex-shrink-0">
                                  <span className="text-sm font-medium text-scrapeGenie-600">{message.avatar}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between">
                                    <p className="font-medium truncate">{message.from}</p>
                                    <p className="text-xs text-gray-500">{message.timestamp}</p>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 truncate pl-10">{message.content}</p>
                              {!message.read && (
                                <div className="pl-10 mt-1">
                                  <span className="inline-block w-2 h-2 bg-scrapeGenie-500 rounded-full"></span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="md:w-2/3 border rounded-lg flex flex-col">
                        {currentMessage ? (
                          <>
                            <div className="p-4 bg-gray-50 border-b flex items-center">
                              <div className="h-8 w-8 rounded-full bg-scrapeGenie-100 flex items-center justify-center mr-2">
                                <span className="text-sm font-medium text-scrapeGenie-600">{currentMessage.avatar}</span>
                              </div>
                              <div>
                                <p className="font-medium">{currentMessage.from}</p>
                                <p className="text-xs text-gray-500">{currentMessage.timestamp}</p>
                              </div>
                            </div>
                            
                            <div className="flex-1 p-4 overflow-y-auto">
                              <div className="mb-4 bg-gray-100 rounded-lg p-3 inline-block">
                                <p className="text-gray-800">{currentMessage.content}</p>
                              </div>
                            </div>
                            
                            <div className="p-4 border-t">
                              <div className="flex space-x-2">
                                <div className="flex-1">
                                  <Textarea 
                                    placeholder="Type your reply..." 
                                    className="w-full" 
                                    rows={3}
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                  />
                                </div>
                                <Button 
                                  className="self-end"
                                  onClick={handleSendReply}
                                  disabled={!replyText.trim()}
                                >
                                  Send
                                </Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500 flex-col p-8">
                            <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                            <p>Select a conversation to view messages</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* Analytics Tab */}
                <TabsContent value="analytics" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Sales Analytics</h3>
                  <div className="text-gray-500 mb-6">Track your sales performance</div>
                  
                  {/* Analytics content */}
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
                
                {/* Settings Tab */}
                <TabsContent value="settings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Personal Information</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Name</Label>
                            <Input type="text" className="w-full" defaultValue={user.name} />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
                            <Input type="email" className="w-full" defaultValue={user.email} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Phone</Label>
                            <Input type="tel" className="w-full" defaultValue={user.phone || ""} />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Location</Label>
                            <Input type="text" className="w-full" defaultValue={user.location || ""} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Store Information</h4>
                      <div className="space-y-4">
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Store Name</Label>
                          <Input type="text" className="w-full" defaultValue="Your Store Name" />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-1">Store Description</Label>
                          <Textarea 
                            className="w-full" 
                            rows={3}
                            defaultValue="We sell high-quality products at affordable prices."
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Payment Information</h4>
                      <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</Label>
                        <Input type="text" className="w-full" placeholder="Add your bank account" />
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
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={productDialog} onOpenChange={setProductDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {currentProduct ? "Update your product information" : "Enter details to list a new product"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                value={productForm.title}
                onChange={(e) => handleProductFormChange('title', e.target.value)}
                placeholder="What are you selling?"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={productForm.price}
                  onChange={(e) => handleProductFormChange('price', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select 
                  value={productForm.condition} 
                  onValueChange={(value) => handleProductFormChange('condition', value)}
                >
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={productForm.category} 
                onValueChange={(value) => handleProductFormChange('category', value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Sports & Outdoors">Sports & Outdoors</SelectItem>
                  <SelectItem value="Kitchen">Kitchen</SelectItem>
                  <SelectItem value="Toys & Games">Toys & Games</SelectItem>
                  <SelectItem value="Books & Media">Books & Media</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={productForm.description}
                onChange={(e) => handleProductFormChange('description', e.target.value)}
                placeholder="Describe your item in detail" 
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Listing Status</Label>
              <Select 
                value={productForm.statusText} 
                onValueChange={(value) => handleProductFormChange('statusText', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active (Visible to buyers)</SelectItem>
                  <SelectItem value="Draft">Draft (Save for later)</SelectItem>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProductDialog(false)}>Cancel</Button>
            <Button onClick={saveProduct}>{currentProduct ? "Update Product" : "Add Product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Product Confirmation Dialog */}
      <Dialog open={deleteProductDialog} onOpenChange={setDeleteProductDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentProduct && (
              <Alert variant="destructive">
                <AlertTitle className="flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete "{currentProduct.title}"
                </AlertTitle>
                <AlertDescription>
                  This will permanently remove the product from your listings.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteProductDialog(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteProduct}
            >
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Order Status Update Dialog */}
      <Dialog open={orderStatusDialog} onOpenChange={setOrderStatusDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status of this order
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentOrder && (
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Order #{currentOrder.id}</p>
                  <p className="text-sm text-gray-500">{currentOrder.product} - {currentOrder.price}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Select Status</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      type="button"
                      variant={currentOrder.status === 'pending' ? 'default' : 'outline'}
                      className={currentOrder.status === 'pending' ? '' : 'border-yellow-500 text-yellow-500 hover:bg-yellow-50'}
                      onClick={() => updateOrderStatus('pending')}
                    >
                      Pending
                    </Button>
                    <Button 
                      type="button"
                      variant={currentOrder.status === 'shipped' ? 'default' : 'outline'}
                      className={currentOrder.status === 'shipped' ? '' : 'border-blue-500 text-blue-500 hover:bg-blue-50'}
                      onClick={() => updateOrderStatus('shipped')}
                    >
                      Shipped
                    </Button>
                    <Button 
                      type="button"
                      variant={currentOrder.status === 'delivered' ? 'default' : 'outline'}
                      className={currentOrder.status === 'delivered' ? '' : 'border-green-500 text-green-500 hover:bg-green-50'}
                      onClick={() => updateOrderStatus('delivered')}
                    >
                      Delivered
                    </Button>
                    <Button 
                      type="button"
                      variant={currentOrder.status === 'cancelled' ? 'default' : 'outline'}
                      className={currentOrder.status === 'cancelled' ? '' : 'border-red-500 text-red-500 hover:bg-red-50'}
                      onClick={() => updateOrderStatus('cancelled')}
                    >
                      Cancelled
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderStatusDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerDashboard;

