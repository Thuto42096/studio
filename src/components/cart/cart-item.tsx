"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from "@/hooks/use-toast";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateItemQuantity, removeItem } = useCart();
  const { toast } = useToast();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > item.stock) {
      newQuantity = item.stock;
      toast({
        title: "Stock limit reached",
        description: `Only ${item.stock} of ${item.name} available.`,
        variant: "destructive",
      });
    }
    updateItemQuantity(item.id, newQuantity);
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
    toast({
      title: "Item removed",
      description: `${item.name} has been removed from your cart.`,
    });
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <Link href={`/products/${item.id}`}>
        <div className="relative w-20 h-20 rounded-md overflow-hidden aspect-square">
          <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" data-ai-hint="cart item" />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`}>
          <h3 className="text-md font-headline font-semibold hover:text-primary transition-colors">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
          min="1"
          max={item.stock}
          className="w-16 h-8 text-center"
          aria-label={`Quantity for ${item.name}`}
        />
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity + 1)} disabled={item.quantity >= item.stock}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="w-24 text-right font-semibold text-primary">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
      <Button variant="ghost" size="icon" onClick={handleRemoveItem} className="text-muted-foreground hover:text-destructive" aria-label={`Remove ${item.name} from cart`}>
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
