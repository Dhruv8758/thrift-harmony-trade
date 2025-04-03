
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

const ProductCard = ({ product }: { product: Product }) => {
  // Function to format category name for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image group-hover:scale-105 transition-transform duration-300 h-48 w-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </Button>
        <div className="absolute top-2 left-2 bg-scrapeGenie-500 text-white px-2 py-1 text-xs rounded-full">
          {formatCategoryName(product.category)}
        </div>
      </div>
      
      <div className="product-card-content p-4">
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
