
import type { Product, Message, Order } from "./product";

// UI-specific types for the seller dashboard
export interface UIMessage {
  id: string;
  from: string;
  avatar: string;
  content: string;
  timestamp: string;
  read: boolean;
  productId?: string;
  productTitle?: string;
}

export interface UIOrder {
  id: string;
  product: string;
  customer: string;
  price: string;
  status: Order['status'];
  date: string;
}

export interface Payment {
  id: string;
  amount: string;
  from: string;
  for: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

// Function to convert Message to UIMessage
export function convertToUIMessage(message: Message): UIMessage {
  return {
    id: message.id,
    from: message.from.name,
    avatar: message.from.avatar,
    content: message.content,
    timestamp: new Date(message.timestamp).toLocaleString(),
    read: message.read,
    productId: message.productId,
    productTitle: message.productTitle
  };
}

// Function to convert Order to UIOrder
export function convertToUIOrder(order: Order): UIOrder {
  return {
    id: order.id,
    product: order.productName,
    customer: order.buyerName,
    price: `₹${order.price.toLocaleString()}`,
    status: order.status,
    date: new Date(order.date).toLocaleDateString()
  };
}

// Function to convert a real order to a UIOrder
export function createPaymentFromOrder(order: Order): Payment {
  return {
    id: `PAY-${order.id.split('_')[1]}`,
    amount: `₹${order.price.toLocaleString()}`,
    from: order.buyerName,
    for: order.productName,
    date: new Date(order.date).toLocaleDateString(),
    status: 'completed' as const
  };
}
