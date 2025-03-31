
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [
  { id: "1", name: "Clothing" },
  { id: "2", name: "Electronics" },
  { id: "3", name: "Home & Kitchen" },
  { id: "4", name: "Books" },
  { id: "5", name: "Sports & Outdoors" },
  { id: "6", name: "Toys & Games" },
  { id: "7", name: "Beauty & Personal Care" },
  { id: "8", name: "Jewelry" },
];

interface CategoryFilterProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

const CategoryFilter = ({ onCategorySelect, selectedCategory }: CategoryFilterProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">Categories</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-gray-500"
        >
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className={`grid transition-all duration-300 ${
        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] md:grid-rows-[1fr]"
      } overflow-hidden`}>
        <div className="min-h-0">
          <div className="flex flex-wrap gap-2 md:grid md:grid-cols-1">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-scrapeGenie-600 hover:bg-scrapeGenie-700" : ""}
              onClick={() => onCategorySelect(null)}
              size="sm"
            >
              All Items
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={selectedCategory === category.id ? "bg-scrapeGenie-600 hover:bg-scrapeGenie-700" : ""}
                onClick={() => onCategorySelect(category.id)}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
