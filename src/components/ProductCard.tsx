
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { toast } from "@/components/ui/use-toast";

const ProductCard = ({ product }: { product: Product }) => {
  // Check if product is in wishlist
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Load wishlist state on component mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsInWishlist(wishlist.some((item: Product) => item.id === product.id));
  }, [product.id]);

  // Toggle wishlist
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
    
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    
    if (isInWishlist) {
      // Remove from wishlist
      const newWishlist = wishlist.filter((item: Product) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      setIsInWishlist(false);
      toast({
        title: "Removed from wishlist",
        description: `${product.title} has been removed from your wishlist`,
      });
    } else {
      // Add to wishlist
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsInWishlist(true);
      toast({
        title: "Added to wishlist",
        description: `${product.title} has been added to your wishlist`,
      });
    }
  };

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image group-hover:scale-105 transition-transform duration-300 h-48 w-full object-cover"
          onError={(e) => {
            // Fallback image if the original image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop";
            target.onerror = null; // Prevent infinite fallback loop
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
          onClick={toggleWishlist}
        >
          <Heart 
            className={`h-5 w-5 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600'} hover:text-red-500`} 
          />
        </Button>
        <div className="absolute top-2 left-2 bg-scrapeGenie-500 text-white px-2 py-1 text-xs rounded-full">
          {formatCategoryName(product.category)}
        </div>
      </div>
      
      <div className="product-card-content p-4 bg-white rounded-b-lg shadow">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card-title font-medium hover:text-scrapeGenie-600 transition-colors">{product.title}</h3>
        </Link>
        <p className="product-card-price font-bold text-lg mt-1">₹{(product.price * 75).toFixed(0)}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="product-card-seller text-sm text-gray-600">
            {product.seller.name} • {product.seller.rating}⭐
          </p>
          <span className="product-card-condition text-xs bg-gray-100 px-2 py-1 rounded-full">{product.condition}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
