"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { CreditCard, User, Mail, MapPin } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();
    // Mock order placement
    clearCart();
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
      duration: 5000,
    });
    router.push('/'); 
  };

  if (items.length === 0) {
    // This will typically be handled by the redirect, but as a fallback:
    return <p className="text-center py-10 font-body">Your cart is empty. Redirecting...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-headline font-bold mb-8 text-primary text-center">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* Order Summary */}
        <div className="lg:order-last">
          <Card className="shadow-xl sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden aspect-square">
                      <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" data-ai-hint="checkout item" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold font-body">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="space-y-2 font-body">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-primary">FREE</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Form */}
        <div className="lg:order-first">
          <form onSubmit={handlePlaceOrder}>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Shipping & Payment</CardTitle>
                <CardDescription className="font-body">Please fill in your details to complete the order.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <section>
                  <h3 className="text-lg font-headline font-semibold mb-3 text-primary">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="font-body flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" />Full Name</Label>
                      <Input id="name" type="text" placeholder="John Doe" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-body flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground" />Email Address</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" required className="mt-1" />
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-headline font-semibold mb-3 text-primary">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="font-body flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" />Street Address</Label>
                      <Input id="address" type="text" placeholder="123 Main St" required className="mt-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="font-body">City</Label>
                        <Input id="city" type="text" placeholder="Anytown" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="zip" className="font-body">ZIP Code</Label>
                        <Input id="zip" type="text" placeholder="12345" required className="mt-1" />
                      </div>
                    </div>
                     <div>
                        <Label htmlFor="country" className="font-body">Country</Label>
                        <Input id="country" type="text" placeholder="United States" required className="mt-1" />
                      </div>
                  </div>
                </section>

                <Separator />
                
                <section>
                  <h3 className="text-lg font-headline font-semibold mb-3 text-primary">Payment Details</h3>
                   <div>
                      <Label htmlFor="card-number" className="font-body flex items-center gap-2"><CreditCard className="w-4 h-4 text-muted-foreground" />Card Number</Label>
                      <Input id="card-number" type="text" placeholder="•••• •••• •••• ••••" required className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="expiry-date" className="font-body">Expiry Date</Label>
                        <Input id="expiry-date" type="text" placeholder="MM/YY" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="font-body">CVC</Label>
                        <Input id="cvc" type="text" placeholder="123" required className="mt-1" />
                      </div>
                    </div>
                </section>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-headline py-3">
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>

      </div>
    </div>
  );
}
