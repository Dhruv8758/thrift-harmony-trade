
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import { dummyProducts } from "@/data/products";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, redirect to a search results page
      // For now, we'll just close the search dialog
      setIsSearchOpen(false);
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const filteredProducts = dummyProducts.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-scrapeGenie-600" />
            <span className="text-xl font-bold text-scrapeGenie-700">ScrapeGenie</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-4">
            <Button
              variant="outline"
              className="w-full justify-between text-gray-500 font-normal"
              onClick={() => setIsSearchOpen(true)}
            >
              <div className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                <span>Search for items...</span>
              </div>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          {/* Nav Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/sell" className="text-gray-600 hover:text-scrapeGenie-600">
              Sell
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-scrapeGenie-600">
              Categories
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button className="bg-scrapeGenie-600 hover:bg-scrapeGenie-700">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-3 animate-fadeIn">
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between text-gray-500 font-normal"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
              >
                <div className="flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  <span>Search for items...</span>
                </div>
              </Button>
            </div>
            <div className="flex flex-col space-y-2 pt-2">
              <Link
                to="/sell"
                className="text-gray-600 hover:text-scrapeGenie-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell
              </Link>
              <Link
                to="/categories"
                className="text-gray-600 hover:text-scrapeGenie-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-scrapeGenie-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Button 
                className="bg-scrapeGenie-600 hover:bg-scrapeGenie-700 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <form onSubmit={handleSearchSubmit}>
          <CommandInput 
            placeholder="Search for items..." 
            value={searchQuery}
            onValueChange={handleSearch}
          />
        </form>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {filteredProducts.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => handleSelectProduct(product.id)}
                className="flex items-center"
              >
                <div className="w-10 h-10 mr-2 overflow-hidden rounded">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 truncate">
                  <div className="truncate">{product.title}</div>
                  <div className="text-sm text-muted-foreground">₹{(product.price * 75).toFixed(0)}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
};

export default Navbar;
