
export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  seller: {
    name: string;
    rating: number;
    id?: string; // Add seller ID for easier tracking
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
  likedBy?: string[]; // Track users who liked products
};

export type Order = {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string; // Added for contact info
  buyerPhone: string; // Added for contact info
  price: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string; // Made non-optional
  contactNumber: string; // Made non-optional
  paymentMethod: 'credit-card' | 'debit-card' | 'upi' | 'cash-on-delivery' | 'wallet';
  paymentStatus: 'paid' | 'pending' | 'failed';
};

export type Message = {
  id: string;
  from: {
    id: string;
    name: string;
    avatar: string;
  };
  to: {
    id: string;
    name: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
  productId?: string;
  productTitle?: string;
};

