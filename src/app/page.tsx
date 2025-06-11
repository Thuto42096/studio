import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center py-12">
      <div className="relative w-full max-w-3xl h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-xl">
        <Image 
          src="https://placehold.co/1200x600.png" 
          alt="ShopFront Hero Image" 
          layout="fill" 
          objectFit="cover" 
          priority
          data-ai-hint="storefront display"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6">
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-white mb-4">
            Welcome to ShopFront
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-body max-w-xl">
            Discover unique handcrafted goods, stylish apparel, and inspiring art.
          </p>
        </div>
      </div>
      
      <p className="text-lg text-foreground mb-6 font-body max-w-2xl">
        At ShopFront, we curate a collection of high-quality products that blend creativity with sophistication. Explore our catalog and find something special.
      </p>
      <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground font-headline text-lg py-3 px-8">
        <Link href="/products">
          Browse All Products
        </Link>
      </Button>

      <section className="mt-16 w-full max-w-5xl">
        <h2 className="text-3xl font-headline font-bold text-primary mb-8">Why Shop With Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-headline font-semibold text-primary mb-2">Unique Selection</h3>
            <p className="text-muted-foreground font-body">Carefully curated items you won&apos;t find anywhere else.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-headline font-semibold text-primary mb-2">Quality Craftsmanship</h3>
            <p className="text-muted-foreground font-body">Products made with passion and attention to detail.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-headline font-semibold text-primary mb-2">Seamless Shopping</h3>
            <p className="text-muted-foreground font-body">Enjoy a smooth and delightful browsing experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
