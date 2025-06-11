export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number; // From 1 to 5
  stock: number;
  reviews?: number; // Number of reviews
};

export type CartItem = Product & {
  quantity: number;
};
