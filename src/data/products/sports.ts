
import { Product } from "@/types/product";

export const sportsProducts: Product[] = [
  {
    id: "sports1",
    title: "Professional Tennis Racket",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1617083304161-1d4248e9c7d8?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "SportsPro",
      rating: 4.8
    },
    category: "sports",
    description: "Professional-grade tennis racket with perfect balance and control. Used by competitive players."
  },
  {
    id: "34",
    title: "Mountain Climbing Gear Set",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "AdventureGear",
      rating: 4.8
    },
    category: "sports"
  }
];
