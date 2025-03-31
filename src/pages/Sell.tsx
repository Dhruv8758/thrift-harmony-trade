
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, Camera, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Sell = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this data to an API
    toast({
      title: "Listing Created",
      description: "Your item has been listed successfully!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Sell an Item</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="What are you selling?" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" placeholder="0" min="0" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    <SelectItem value="toys">Toys & Games</SelectItem>
                    <SelectItem value="books">Books & Media</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your item in detail. Include information about brand, model, size, color, etc." 
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                    <Camera className="h-6 w-6 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-500">Add Photo</span>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <Plus className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-500">Add up to 8 photos. First photo will be the cover (main) image.</p>
              </div>
              
              <Button type="submit" className="w-full bg-scrapeGenie-600 hover:bg-scrapeGenie-700">
                <Upload className="mr-2 h-4 w-4" />
                List Item for Sale
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sell;
