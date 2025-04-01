
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyProducts } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share, ShoppingCart, CreditCard, User, Star, Truck, Calendar, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

// Mock review data
interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: "r1",
    userName: "SatisfiedCustomer123",
    rating: 5,
    date: "2023-04-15",
    title: "Excellent purchase, highly recommend!",
    comment: "This product exceeded my expectations. The quality is fantastic and it arrived in perfect condition. I would definitely buy again.",
    verified: true
  },
  {
    id: "r2",
    userName: "RegularShopper",
    rating: 4,
    date: "2023-03-22",
    title: "Very good value for money",
    comment: "Great product for the price. Only giving 4 stars because shipping took a bit longer than expected.",
    verified: true
  },
  {
    id: "r3",
    userName: "HonestReviewer",
    rating: 3,
    date: "2023-02-10",
    title: "Decent but has some flaws",
    comment: "The product is okay but I noticed some minor issues. The seller was helpful though and offered a partial refund.",
    verified: false
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
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

    // Set mock reviews
    setReviews(mockReviews);
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

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout!",
      description: `You are buying ${product.title}.`,
    });
    // In a real app, this would redirect to checkout
    // For now we just show a toast
  };

  // Convert product price to INR
  const priceInINR = product.price * 75;

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

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
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {averageRating.toFixed(1)} ({reviews.length} reviews)
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
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
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col space-y-3">
                  <p className="text-2xl font-bold text-scrapeGenie-600">
                    ₹{priceInINR.toFixed(0)}
                  </p>
                  <p className="text-sm text-green-600">
                    Free shipping available
                  </p>
                  <div className="flex items-center text-sm text-gray-700">
                    <Truck className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Estimated delivery: 3-5 business days</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Shield className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Buyer protection included</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Add to Cart button */}
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-scrapeGenie-600 hover:bg-scrapeGenie-700 py-6 text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                {/* Buy Now button */}
                <Button 
                  onClick={handleBuyNow}
                  className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg text-white"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Buy Now
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
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
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
              
              <TabsContent value="reviews" className="pt-4">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="ml-2 text-lg font-medium">
                      {averageRating.toFixed(1)} out of 5
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <Card key={review.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <h4 className="font-bold">{review.title}</h4>
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <span>By {review.userName}</span>
                            {review.verified && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          
                          <p className="mt-3 text-gray-700">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
