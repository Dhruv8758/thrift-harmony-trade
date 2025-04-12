
/**
 * Utility functions for real-time data synchronization across the application
 */

import type { Product, Message, Order } from "@/types/product";

// Use localStorage events for real-time communication between tabs/windows
export const broadcastEvent = <T>(eventName: string, data: T): void => {
  // Store the event data in localStorage
  localStorage.setItem(
    `event_${eventName}`,
    JSON.stringify({
      data,
      timestamp: new Date().getTime(),
    })
  );

  // Dispatch a custom event for the current window
  const event = new CustomEvent(`scrapeGenie_${eventName}`, { detail: data });
  window.dispatchEvent(event);
};

// Subscribe to real-time events
export const subscribeToEvent = <T>(
  eventName: string,
  callback: (data: T) => void
): (() => void) => {
  // Handler for storage events (cross-tab communication)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === `event_${eventName}` && e.newValue) {
      try {
        const { data } = JSON.parse(e.newValue);
        callback(data);
      } catch (error) {
        console.error(`Error processing ${eventName} event:`, error);
      }
    }
  };

  // Handler for custom events (same-tab communication)
  const handleCustomEvent = (e: CustomEvent) => {
    callback(e.detail);
  };

  // Add event listeners
  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(`scrapeGenie_${eventName}`, handleCustomEvent as EventListener);

  // Return unsubscribe function
  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(`scrapeGenie_${eventName}`, handleCustomEvent as EventListener);
  };
};

// Helper for getting the logged-in user information
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      return JSON.parse(userData);
    }
  } catch (error) {
    console.error("Error getting current user:", error);
  }
  return null;
};

// Store and retrieve messages between users and sellers
export const storeMessage = (message: Message) => {
  try {
    // Retrieve existing messages
    const messagesData = localStorage.getItem("userMessages") || "[]";
    const messages: Message[] = JSON.parse(messagesData);
    
    // Add new message
    messages.push(message);
    
    // Save updated messages
    localStorage.setItem("userMessages", JSON.stringify(messages));
    
    // Broadcast the new message event
    broadcastEvent("newMessage", message);
  } catch (error) {
    console.error("Error storing message:", error);
  }
};

// Get messages for a specific user (sender or recipient)
export const getUserMessages = (userId: string): Message[] => {
  try {
    const messagesData = localStorage.getItem("userMessages") || "[]";
    const messages: Message[] = JSON.parse(messagesData);
    
    // Filter messages where the user is either sender or recipient
    return messages.filter(
      (msg) => msg.from.id === userId || msg.to.id === userId
    );
  } catch (error) {
    console.error("Error getting user messages:", error);
    return [];
  }
};

// Store a new order
export const storeOrder = (order: Order) => {
  try {
    // Retrieve existing orders
    const ordersData = localStorage.getItem("userOrders") || "[]";
    const orders: Order[] = JSON.parse(ordersData);
    
    // Add new order
    orders.push(order);
    
    // Save updated orders
    localStorage.setItem("userOrders", JSON.stringify(orders));
    
    // Broadcast the new order event
    broadcastEvent("newOrder", order);
  } catch (error) {
    console.error("Error storing order:", error);
  }
};

// Update an existing order
export const updateOrder = (orderId: string, updates: Partial<Order>) => {
  try {
    // Retrieve existing orders
    const ordersData = localStorage.getItem("userOrders") || "[]";
    const orders: Order[] = JSON.parse(ordersData);
    
    // Find and update the order
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, ...updates } : order
    );
    
    // Save updated orders
    localStorage.setItem("userOrders", JSON.stringify(updatedOrders));
    
    // Find the updated order
    const updatedOrder = updatedOrders.find(order => order.id === orderId);
    if (updatedOrder) {
      // Broadcast the order updated event
      broadcastEvent("orderUpdated", updatedOrder);
    }
  } catch (error) {
    console.error("Error updating order:", error);
  }
};

// Get orders for a specific user (buyer or seller)
export const getUserOrders = (userId: string, role: 'buyer' | 'seller'): Order[] => {
  try {
    const ordersData = localStorage.getItem("userOrders") || "[]";
    const orders: Order[] = JSON.parse(ordersData);
    
    // Filter orders based on role
    return orders.filter(
      (order) => role === 'buyer' ? order.buyerId === userId : order.sellerId === userId
    );
  } catch (error) {
    console.error("Error getting user orders:", error);
    return [];
  }
};

// Update product likes
export const toggleProductLike = (productId: string, userId: string) => {
  try {
    // Get current products from all categories
    const products = JSON.parse(localStorage.getItem("allProducts") || "[]");
    
    // Find the product
    const updatedProducts = products.map((product: Product) => {
      if (product.id === productId) {
        const likedBy = product.likedBy || [];
        const isLiked = likedBy.includes(userId);
        
        const updatedProduct = {
          ...product,
          likes: isLiked ? (product.likes || 0) - 1 : (product.likes || 0) + 1,
          likedBy: isLiked 
            ? likedBy.filter(id => id !== userId) 
            : [...likedBy, userId]
        };
        
        // Broadcast the product update
        broadcastEvent("productUpdated", updatedProduct);
        return updatedProduct;
      }
      return product;
    });
    
    // Save updated products
    localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
  } catch (error) {
    console.error("Error toggling product like:", error);
  }
};

// Re-export types for convenience
export type { Message, Order, Product };
