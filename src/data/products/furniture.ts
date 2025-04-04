
import { Product } from "@/types/product";

export const furnitureProducts: Product[] = [
  {
    id: "71",
    title: "Mid-Century Modern Sofa",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
    condition: "Like New",
    seller: {
      name: "ModernHome",
      rating: 4.8
    },
    category: "furniture",
    description: "Stylish mid-century modern sofa in teal blue. Barely used and in perfect condition. Original price was $1,500."
  },
  {
    id: "72",
    title: "Solid Oak Dining Table",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "WoodWorks",
      rating: 4.7
    },
    category: "furniture",
    description: "Solid oak dining table that seats 6 people comfortably. Some minor scratches but overall in good condition."
  },
  {
    id: "73",
    title: "Leather Recliner Chair",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&auto=format&fit=crop",
    condition: "Good",
    seller: {
      name: "ComfortSeating",
      rating: 4.5
    },
    category: "furniture",
    description: "Genuine leather recliner chair in dark brown. Very comfortable and functioning perfectly. Some wear on the armrests."
  }
];
