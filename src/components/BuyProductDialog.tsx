
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingBag } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { storeOrder, getCurrentUser } from "@/utils/realTimeUtils";
import type { Order } from "@/utils/realTimeUtils";
import { Product } from "@/types/product";

interface BuyProductDialogProps {
  product: Product;
  triggerComponent?: React.ReactNode;
}

const BuyProductDialog: React.FC<BuyProductDialogProps> = ({ product, triggerComponent }) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  const handlePurchase = () => {
    if (!address.trim() || !phone.trim() || !currentUser) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create order object
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      productId: product.id,
      productName: product.title,
      productImage: product.image,
      sellerId: product.seller.id || product.seller.name.replace(/\s+/g, '').toLowerCase(),
      sellerName: product.seller.name,
      buyerId: currentUser.id || currentUser.email,
      buyerName: currentUser.name,
      price: product.price,
      date: new Date().toISOString(),
      status: 'pending',
      deliveryAddress: address,
      contactNumber: phone
    };
    
    // Store and broadcast the order
    storeOrder(newOrder);
    
    // Show confirmation toast
    toast({
      title: "Order placed successfully!",
      description: `Your order for ${product.title} has been placed.`,
    });
    
    setAddress("");
    setPhone("");
    setOpen(false);
  };
  
  if (!currentUser) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerComponent || (
          <Button>
            <ShoppingBag className="h-4 w-4 mr-2" /> Buy Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            Please provide delivery information for {product.title}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{product.title}</h3>
                <p className="text-sm text-gray-500">Seller: {product.seller.name}</p>
              </div>
              <div className="text-lg font-bold">
                ₹{(product.price).toFixed(0)}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea 
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Contact Number</Label>
              <Input 
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Payment Method</Label>
              <div className="bg-white border rounded-lg mt-1 p-3">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="cod" 
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="cod" className="text-sm font-medium">Cash on Delivery</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handlePurchase}>Place Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyProductDialog;
