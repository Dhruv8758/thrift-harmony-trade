
import { Product } from "@/types/product";

export const toolsProducts: Product[] = [
  {
    id: "21",
    title: "Power Drill Set - Professional",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572981739426-e70c834d29d3?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "ToolMaster",
      rating: 4.9
    },
    category: "tools"
  },
  {
    id: "38",
    title: "Electric Power Saw",
    price: 169.99,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "ToolMaster",
      rating: 4.7
    },
    category: "tools"
  }
];
