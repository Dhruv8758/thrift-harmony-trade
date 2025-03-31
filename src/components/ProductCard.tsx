
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  seller: {
    name: string;
    rating: number;
  };
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </Button>
      </div>
      
      <div className="product-card-content">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card-title">{product.title}</h3>
        </Link>
        <p className="product-card-price">₹{(product.price * 75).toFixed(0)}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="product-card-seller">
            {product.seller.name} • {product.seller.rating}⭐
          </p>
          <span className="product-card-condition">{product.condition}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
