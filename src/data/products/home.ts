
import { Product } from "@/types/product";

export const homeProducts: Product[] = [
  {
    id: "3",
    title: "Mid-Century Coffee Table",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "HomeDecorPro",
      rating: 4.7
    },
    category: "home"
  },
  {
    id: "11",
    title: "Antique Wooden Chair",
    price: 85.99,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "VintageHome",
      rating: 4.7
    },
    category: "home"
  },
  {
    id: "15",
    title: "Handmade Ceramic Vase",
    price: 38.50,
    image: "https://images.unsplash.com/photo-1612900538103-ff51d8c24cfc?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "ArtisanCrafts",
      rating: 4.9
    },
    category: "home"
  }
];
