
import { Product } from "@/types/product";

export const kitchenProducts: Product[] = [
  {
    id: "23",
    title: "Professional Chef Knife Set",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1566454419290-57a64afe30ac?w=800&auto=format&fit=crop",
    condition: "New",
    seller: {
      name: "KitchenPro",
      rating: 4.9
    },
    category: "kitchen"
  },
  {
    id: "24",
    title: "Espresso Coffee Machine",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "CoffeeLover",
      rating: 4.8
    },
    category: "kitchen"
  },
  {
    id: "25",
    title: "Cast Iron Dutch Oven",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1585672841769-2072eaef8167?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "HomeChef",
      rating: 4.7
    },
    category: "kitchen"
  }
];
