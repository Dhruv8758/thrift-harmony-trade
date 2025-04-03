
import { Product } from "@/types/product";

export const businessProducts: Product[] = [
  {
    id: "29",
    title: "Industrial 3D Printer",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1565086536703-1b2e036b7ede?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "TechIndustry",
      rating: 4.9
    },
    category: "business"
  },
  {
    id: "30",
    title: "Office Ergonomic Chair",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "OfficeSupplyCo",
      rating: 4.7
    },
    category: "business"
  }
];
