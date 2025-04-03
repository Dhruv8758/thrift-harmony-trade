
import { Product } from "@/types/product";

export const sportsProducts: Product[] = [
  {
    id: "33",
    title: "Professional Tennis Racket",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1617546171921-9c8488e04c3e?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "SportsPro",
      rating: 4.9
    },
    category: "sports"
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
