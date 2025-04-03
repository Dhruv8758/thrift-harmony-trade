
import { Product } from "@/types/product";

export const clothingProducts: Product[] = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "VintageLover",
      rating: 4.8
    },
    category: "clothing"
  },
  {
    id: "8",
    title: "Leather Messenger Bag",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "UrbanStyle",
      rating: 4.5
    },
    category: "clothing"
  },
  {
    id: "12",
    title: "Designer Handbag - Barely Used",
    price: 195.00,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "FashionFinds",
      rating: 4.8
    },
    category: "clothing"
  },
  {
    id: "42",
    title: "Designer Sunglasses",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "FashionEye",
      rating: 4.8
    },
    category: "clothing"
  }
];
