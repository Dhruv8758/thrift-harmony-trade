
import { Product } from "@/types/product";

export const toysProducts: Product[] = [
  {
    id: "26",
    title: "LEGO Star Wars Set",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1518946222227-364f22132616?w=800&auto=format&fit=crop",
    condition: "New",
    seller: {
      name: "ToyCollector",
      rating: 4.9
    },
    category: "toys"
  },
  {
    id: "27",
    title: "Remote Control Drone",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1521405924368-64c332b40842?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "TechHobbyist",
      rating: 4.8
    },
    category: "toys"
  },
  {
    id: "28",
    title: "Vintage Board Game Collection",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "GameNight",
      rating: 4.6
    },
    category: "toys"
  }
];
