
import { Product } from "@/types/product";

export const homeProducts: Product[] = [
  {
    id: "home1",
    title: "Handmade Ceramic Vase",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1578500351865-d6c3969872ed?w=800&auto=format&fit=crop",
    condition: "New",
    seller: {
      name: "ArtisanCrafts",
      rating: 4.8
    },
    category: "home",
    description: "Beautiful handcrafted ceramic vase with a modern design. Perfect for fresh flowers or as a decorative piece."
  },
  {
    id: "1",
    title: "Modern Coffee Table",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1533779193798-a9599729cd5e?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "HomeStyle",
      rating: 4.7
    },
    category: "home"
  },
  {
    id: "3",
    title: "Cozy Throw Blanket",
    price: 29.50,
    image: "https://images.unsplash.com/photo-1532466954396-6abc627c56dd?w=800&auto=format&fit=crop",
    condition: "New",
    seller: {
      name: "ComfortZone",
      rating: 4.6
    },
    category: "home"
  },
  {
    id: "4",
    title: "Set of Decorative Pillows",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1549187531-5e069911c7bc?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "PillowParadise",
      rating: 4.5
    },
    category: "home"
  },
  {
    id: "5",
    title: "Wall Art - Abstract Painting",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1557596445-bb0b14230722?w=800&auto=format&fit=crop",
    condition: "New",
    seller: {
      name: "ArtGallery",
      rating: 4.8
    },
    category: "home"
  }
];
