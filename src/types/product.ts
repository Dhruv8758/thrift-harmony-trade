
export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  seller: {
    name: string;
    rating: number;
  };
  category: string;
};
