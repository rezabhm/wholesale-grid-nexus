export type Supplier = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  years: number;
  rating: number;
  verified: boolean;
};

export type PriceTier = { minQty: number; maxQty?: number; price: number };

export type Product = {
  id: string;
  title: string;
  image: string;
  images: string[];
  priceMin: number;
  priceMax: number;
  moq: number;
  unit: string;
  supplier: Supplier;
  category: string;
  rating: number;
  reviews: number;
  sold: number;
  tiers: PriceTier[];
  description: string;
  specs: { label: string; value: string }[];
};

export type OrderStatus = "Open" | "Negotiating" | "Closed";

export type Order = {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  supplier: string;
  qty: number;
  unit: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  orderId: string;
  from: "buyer" | "supplier";
  text: string;
  time: string;
  attachment?: { name: string; size: string };
};

export type Category = { id: string; name: string; icon: string; subcategories: string[] };
