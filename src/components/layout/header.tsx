"use client";

import Link from 'next/link';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-primary">ShopFront</h1>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-foreground hover:text-primary transition-colors font-body">
            Home
          </Link>
          <Link href="/products" className="text-foreground hover:text-primary transition-colors font-body">
            Products
          </Link>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" aria-label="View shopping cart">
              <ShoppingCart className="h-6 w-6 text-foreground" />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
