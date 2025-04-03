
import { Product } from "@/types/product";

export const computersProducts: Product[] = [
  {
    id: "39",
    title: "Laptop Stand with Cooling Fan",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop",
    condition: "New",
    seller: {
      name: "TechAccessories",
      rating: 4.6
    },
    category: "computers"
  },
  {
    id: "40",
    title: "Gaming Desktop Computer",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "GamerHub",
      rating: 4.9
    },
    category: "computers"
  }
];
