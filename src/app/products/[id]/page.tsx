"use client"; // Needs to be client for useCart and useToast

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import type { Product } from '@/types';
import { products as allProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCartIcon, Star, ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundProduct = allProducts.find((p) => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">Loading product details...</p>
      </div>
    );
  }
  
  // After loading, if product is still null (not found)
  if (product === null && id) { // Checking id ensures we don't show this before useEffect runs
     return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">Sorry, we couldn't find the product you're looking for.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/products">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </Button>
      </div>
    );
  }


  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast({
        title: "Added to cart",
        description: `${product.name} (x${quantity}) has been added to your cart.`,
      });
    }
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => {
      const newQuantity = prev + change;
      if (newQuantity < 1) return 1;
      if (newQuantity > product.stock) return product.stock;
      return newQuantity;
    });
  };


  return (
    <div className="max-w-4xl mx-auto">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/products">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>
      </Button>
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <CardHeader className="p-0">
            <div className="aspect-square relative w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint={`${product.category} product detail`}
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 flex flex-col justify-center">
            <CardTitle className="text-3xl font-headline text-primary mb-3">{product.name}</CardTitle>
            
            <div className="flex items-center gap-2 mb-3">
              {product.rating && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating.toFixed(1)}</span>
                  {product.reviews && <span>({product.reviews} reviews)</span>}
                </div>
              )}
            </div>

            <CardDescription className="text-lg text-foreground font-body mb-4">
              {product.longDescription || product.description}
            </CardDescription>
            
            <Separator className="my-4" />

            <p className="text-4xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>

            <div className="flex items-center gap-4 mb-6">
              <p className="font-medium">Quantity:</p>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>+</Button>
              </div>
              <p className="text-sm text-muted-foreground">(In stock: {product.stock})</p>
            </div>

            <Button onClick={handleAddToCart} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={product.stock === 0}>
              <ShoppingCartIcon className="mr-2 h-5 w-5" /> {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
