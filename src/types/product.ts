
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
  description?: string;
  verificationStatus?: "Verified" | "Pending" | "Unverified";
  healthScore?: number;
  conditionComparison?: {
    similarItems: number;
    conditionRank: number;
    aboveAverage: boolean;
  };
  dateAdded?: string;
  statusText?: 'Active' | 'Draft' | 'Pending Review';
  views?: number;
  likes?: number;
};
