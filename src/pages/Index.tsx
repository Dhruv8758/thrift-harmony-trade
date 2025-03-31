
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCard, { Product } from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import Footer from "@/components/Footer";
import { dummyProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const MAX_PRICE = 500; // Maximum price for filter

const Index = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(dummyProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    filterProducts(categoryId, priceRange);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    filterProducts(selectedCategory, [min, max]);
  };

  const filterProducts = (
    category: string | null,
    price: [number, number]
  ) => {
    // In a real app, you'd call an API with these filters
    // For now, we'll just filter our dummy data
    const filtered = dummyProducts.filter((product) => {
      const matchesCategory = category === null || product.id.includes(category);
      const matchesPrice = product.price >= price[0] && product.price <= price[1];
      return matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="container mx-auto px-4 py-8">
          <FeaturedProducts />
          
          <section className="my-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Browse All Items</h2>
              <Button 
                variant="outline" 
                className="md:hidden flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <aside className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
                <div className="sticky top-24 space-y-6 bg-white p-4 rounded-lg border">
                  <CategoryFilter 
                    onCategorySelect={handleCategorySelect}
                    selectedCategory={selectedCategory}
                  />
                  
                  <PriceRangeFilter 
                    onPriceRangeChange={handlePriceRangeChange}
                    maxPrice={MAX_PRICE}
                  />
                </div>
              </aside>
              
              <div className="md:w-3/4">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No products found matching your filters.</p>
                    <Button 
                      onClick={() => {
                        setSelectedCategory(null);
                        setPriceRange([0, MAX_PRICE]);
                        setFilteredProducts(dummyProducts);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
