"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

interface ProductFiltersProps {
  sortOption: SortOption;
  setSortOption: Dispatch<SetStateAction<SortOption>>;
}

export default function ProductFilters({ sortOption, setSortOption }: ProductFiltersProps) {
  return (
    <div className="mb-8 p-4 bg-muted/30 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="sort-by" className="text-sm font-medium font-body">Sort by:</Label>
          <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
            <SelectTrigger id="sort-by" className="w-[180px] bg-background">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Popularity (Rating)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Placeholder for future filters like category or search */}
        {/* 
        <div className="flex items-center gap-2">
          <Label htmlFor="search" className="text-sm font-medium">Search:</Label>
          <Input id="search" placeholder="Product name..." className="w-[200px]" />
        </div>
        */}
      </div>
    </div>
  );
}
