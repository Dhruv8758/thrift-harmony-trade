
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-scrapeGenie-100 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-scrapeGenie-600" />
                  </div>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-gray-500">Member since March 2023</p>
                </div>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <div className="cursor-pointer">
                      <Package className="mr-2 h-5 w-5" />
                      My Orders
                    </div>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <div className="cursor-pointer">
                      <Heart className="mr-2 h-5 w-5" />
                      Favorites
                    </div>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <div className="cursor-pointer">
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </div>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" asChild>
                    <div className="cursor-pointer">
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign Out
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="md:w-3/4">
              <Tabs defaultValue="listings">
                <TabsList className="mb-6">
                  <TabsTrigger value="listings">My Listings</TabsTrigger>
                  <TabsTrigger value="purchases">My Purchases</TabsTrigger>
                  <TabsTrigger value="settings">Account Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="listings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">My Listings</h3>
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-2">You haven't listed any items yet</p>
                    <Button>List an Item</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="purchases" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">My Purchases</h3>
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-2">You haven't purchased any items yet</p>
                    <Button>Start Shopping</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                  <p className="text-gray-500">Account settings would go here.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
