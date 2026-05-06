import type { Product, Category, Order, ChatMessage, Supplier } from "@/types";

export const categories: Category[] = [
  { id: "electronics", name: "Consumer Electronics", icon: "Cpu", subcategories: ["Phones", "Laptops", "Audio", "Wearables", "Cameras", "Accessories"] },
  { id: "machinery", name: "Industrial Machinery", icon: "Factory", subcategories: ["CNC", "Packaging", "Printing", "Construction", "Agriculture"] },
  { id: "apparel", name: "Apparel & Textiles", icon: "Shirt", subcategories: ["Men", "Women", "Kids", "Fabric", "Footwear"] },
  { id: "home", name: "Home & Garden", icon: "Home", subcategories: ["Furniture", "Kitchen", "Lighting", "Decor", "Tools"] },
  { id: "beauty", name: "Beauty & Personal Care", icon: "Sparkles", subcategories: ["Skincare", "Haircare", "Makeup", "Fragrance"] },
  { id: "auto", name: "Vehicles & Parts", icon: "Car", subcategories: ["EV", "Tires", "Batteries", "Accessories"] },
  { id: "sports", name: "Sports & Outdoors", icon: "Bike", subcategories: ["Cycling", "Camping", "Fitness", "Water Sports"] },
  { id: "packaging", name: "Packaging & Printing", icon: "Package", subcategories: ["Boxes", "Bags", "Labels", "Bottles"] },
  { id: "food", name: "Food & Beverage", icon: "Coffee", subcategories: ["Snacks", "Drinks", "Ingredients"] },
  { id: "office", name: "Office Supplies", icon: "Briefcase", subcategories: ["Stationery", "Furniture", "Electronics"] },
];

export const suppliers: Supplier[] = [
  { id: "s1", name: "Shenzhen Globaltech Co., Ltd.", country: "China", countryCode: "CN", years: 8, rating: 4.8, verified: true },
  { id: "s2", name: "Guangzhou Prime Industries", country: "China", countryCode: "CN", years: 12, rating: 4.7, verified: true },
  { id: "s3", name: "Mumbai Textiles Ltd.", country: "India", countryCode: "IN", years: 15, rating: 4.6, verified: true },
  { id: "s4", name: "Istanbul Trade Group", country: "Turkey", countryCode: "TR", years: 6, rating: 4.5, verified: true },
  { id: "s5", name: "Saigon Manufacturing JSC", country: "Vietnam", countryCode: "VN", years: 10, rating: 4.7, verified: true },
  { id: "s6", name: "Seoul Electronics Inc.", country: "South Korea", countryCode: "KR", years: 20, rating: 4.9, verified: true },
];

const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`;

export const products: Product[] = Array.from({ length: 36 }).map((_, i) => {
  const cat = categories[i % categories.length];
  const sup = suppliers[i % suppliers.length];
  const basePrice = 2 + (i % 20) * 3.5;
  return {
    id: `p${i + 1}`,
    title: `${cat.name.split(" ")[0]} Wholesale Item ${i + 1} - Factory Direct OEM Custom`,
    image: img(`prod${i}`),
    images: [img(`prod${i}`), img(`prod${i}a`), img(`prod${i}b`), img(`prod${i}c`), img(`prod${i}d`)],
    priceMin: +(basePrice * 0.8).toFixed(2),
    priceMax: +(basePrice * 1.4).toFixed(2),
    moq: [50, 100, 200, 500][i % 4],
    unit: "Pieces",
    supplier: sup,
    category: cat.id,
    rating: 4 + ((i % 10) / 10),
    reviews: 12 + i * 7,
    sold: 100 + i * 53,
    tiers: [
      { minQty: [50, 100, 200, 500][i % 4], maxQty: 499, price: +(basePrice * 1.4).toFixed(2) },
      { minQty: 500, maxQty: 1999, price: +(basePrice * 1.1).toFixed(2) },
      { minQty: 2000, maxQty: 9999, price: +(basePrice * 0.95).toFixed(2) },
      { minQty: 10000, price: +(basePrice * 0.8).toFixed(2) },
    ],
    description:
      "High-quality wholesale product manufactured in our ISO-certified facility. We offer OEM/ODM services, custom packaging, and worldwide shipping. Bulk orders welcome with competitive pricing tiers.",
    specs: [
      { label: "Brand Name", value: "OEM" },
      { label: "Model Number", value: `MD-${1000 + i}` },
      { label: "Place of Origin", value: sup.country },
      { label: "Material", value: "Premium Grade" },
      { label: "Certification", value: "CE, RoHS, ISO9001" },
      { label: "Lead Time", value: "15-30 days" },
      { label: "Payment Terms", value: "T/T, L/C, Western Union" },
      { label: "Packaging", value: "Carton box, customizable" },
    ],
  };
});

export const recommended = products.slice(0, 12);
export const featured = products.slice(12, 20);
export const supplierHighlights = suppliers;

export const orders: Order[] = [
  { id: "o1001", productId: "p1", productTitle: products[0].title, productImage: products[0].image, supplier: products[0].supplier.name, qty: 500, unit: "Pieces", total: 2200, status: "Negotiating", createdAt: "2026-04-21" },
  { id: "o1002", productId: "p4", productTitle: products[3].title, productImage: products[3].image, supplier: products[3].supplier.name, qty: 100, unit: "Pieces", total: 980, status: "Open", createdAt: "2026-04-25" },
  { id: "o1003", productId: "p7", productTitle: products[6].title, productImage: products[6].image, supplier: products[6].supplier.name, qty: 2000, unit: "Pieces", total: 12400, status: "Closed", createdAt: "2026-03-10" },
  { id: "o1004", productId: "p9", productTitle: products[8].title, productImage: products[8].image, supplier: products[8].supplier.name, qty: 250, unit: "Pieces", total: 1850, status: "Negotiating", createdAt: "2026-04-18" },
  { id: "o1005", productId: "p12", productTitle: products[11].title, productImage: products[11].image, supplier: products[11].supplier.name, qty: 800, unit: "Pieces", total: 5600, status: "Open", createdAt: "2026-04-29" },
];

export const chatThreads: Record<string, ChatMessage[]> = {
  o1001: [
    { id: "m1", orderId: "o1001", from: "buyer", text: "Hi, I'm interested in 500 units. What's your best price including shipping to Dubai?", time: "10:24" },
    { id: "m2", orderId: "o1001", from: "supplier", text: "Hello! Thank you for your inquiry. For 500 units FOB Shenzhen $4.20/pc. CIF Dubai $4.85/pc.", time: "10:31" },
    { id: "m3", orderId: "o1001", from: "buyer", text: "Can you do $4.50 CIF if I increase to 800 units?", time: "10:45" },
    { id: "m4", orderId: "o1001", from: "supplier", text: "Let me check with production. Sample specs attached for review.", time: "11:02", attachment: { name: "spec_sheet_v2.pdf", size: "1.4 MB" } },
    { id: "m5", orderId: "o1001", from: "supplier", text: "Approved — $4.55 CIF Dubai for 800 units, 25-day lead time, 30% deposit.", time: "11:18" },
  ],
};

export const banners = [
  { id: "b1", title: "Source smarter. Trade faster.", subtitle: "Connect with 200,000+ verified suppliers", cta: "Start sourcing", image: img("hero1") },
  { id: "b2", title: "Trade Assurance", subtitle: "Order protection on every transaction", cta: "Learn more", image: img("hero2") },
  { id: "b3", title: "Top Industry Picks 2026", subtitle: "Curated wholesale deals updated daily", cta: "Browse deals", image: img("hero3") },
];
