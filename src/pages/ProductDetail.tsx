
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyProducts } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share, ShoppingCart, Star, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    // For now, we'll use our dummy data
    const foundProduct = dummyProducts.find((p) => p.id === id);
    setProduct(foundProduct || null);

    // Get random related products
    const related = dummyProducts
      .filter((p) => p.id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setRelatedProducts(related);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    });
  };

  // Convert product price to INR
  const priceInINR = product.price * 75;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-scrapeGenie-600">Home</Link> {" / "}
            <Link to="/categories" className="hover:text-scrapeGenie-600">Categories</Link> {" / "}
            <span>{product.title}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-[400px] object-cover object-center"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-bold text-scrapeGenie-600">
                    ₹{priceInINR.toFixed(0)}
                  </p>
                  <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {product.condition}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <p className="text-gray-700">
                    Seller: <span className="font-medium">{product.seller.name}</span>
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <p className="text-gray-700">
                    Seller Rating: <span className="font-medium">{product.seller.rating}</span>
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-scrapeGenie-600 hover:bg-scrapeGenie-700 py-6 text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-5 w-5" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share className="mr-2 h-5 w-5" />
                    Share
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <Tabs defaultValue="description">
                <TabsList className="w-full">
                  <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                  <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="pt-4">
                  <p className="text-gray-700">
                    This is a high-quality second-hand item in {product.condition} condition. 
                    The seller has taken great care of this item and it shows in its current state.
                    Perfect for anyone looking to save money while still getting a great product.
                  </p>
                </TabsContent>
                
                <TabsContent value="details" className="pt-4">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Condition: {product.condition}</li>
                    <li>Original Purchase: 2 years ago</li>
                    <li>Signs of wear: Minimal</li>
                    <li>All original parts included</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="shipping" className="pt-4">
                  <p className="text-gray-700">
                    Shipping is handled by the seller. Standard shipping takes 3-5 business days.
                    Express shipping is available for an additional fee. Local pickup may be
                    available depending on your location.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Related Products */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="product-card group">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-card-image group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="product-card-content">
                      <h3 className="product-card-title">{product.title}</h3>
                      <p className="product-card-price">₹{(product.price * 75).toFixed(0)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
