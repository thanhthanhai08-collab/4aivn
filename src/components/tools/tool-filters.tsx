// src/components/tools/tool-filters.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Search, FilterX } from "lucide-react";
import { useState, useEffect } from "react";

interface ToolFiltersProps {
  onSearchChange: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
  initialSearchTerm?: string;
}

export function ToolFilters({ onSearchChange, onCategoryChange, categories, initialSearchTerm = "" }: ToolFiltersProps) {
  const t = useTranslations("tool_filters");
  const [currentSearchTerm, setCurrentSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setCurrentSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };
  
  const clearFilters = () => {
    setCurrentSearchTerm("");
    setSelectedCategory("all");
    onSearchChange("");
    onCategoryChange("all");
  };

  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-accent/60 via-accent/30 to-accent/10 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label htmlFor="search-tools" className="block text-sm font-medium text-muted-foreground mb-1">
            {t("search_label")}
          </label>
          <div className="relative">
            <Input
              id="search-tools"
              type="text"
              placeholder={t("search_placeholder")}
              value={currentSearchTerm}
              onChange={handleSearchInputChange}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div>
          <label htmlFor="category-select" className="block text-sm font-medium text-muted-foreground mb-1">
            {t("category_label")}
          </label>
          <Select value={selectedCategory} onValueChange={handleCategorySelect}>
            <SelectTrigger id="category-select">
              <SelectValue placeholder={t("all_categories")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_categories")}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-start-3 flex justify-end">
           <Button variant="ghost" onClick={clearFilters} className="w-full md:w-auto">
            <FilterX className="mr-2 h-4 w-4" /> {t("clear_filters")}
          </Button>
        </div>
      </div>
    </div>
  );
}
