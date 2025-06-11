"use client";

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/product-card';
import ProductFilters, { type SortOption } from '@/components/product/product-filters';
import { products as allProducts } from '@/data/products';
import type { Product } from '@/types';

export default function ProductsPage() {
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  const sortedProducts = useMemo(() => {
    let sorted = [...allProducts];
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'name-asc':
        sorted.sort((a,b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [sortOption]);

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-8 text-center text-primary">Our Products</h1>
      <ProductFilters sortOption={sortOption} setSortOption={setSortOption} />
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground font-body">No products found.</p>
      )}
    </div>
  );
}
