/**
 * Mock REST shim. Routes path → mock-data slice with simulated latency.
 * Replace with real `fetch(BASE_URL + path)` when the backend is live.
 */
import { products, recommended, featured, orders, chatThreads, categories, suppliers } from "../mock";

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function mockApi<T>(path: string, _init?: RequestInit): Promise<T> {
  await wait();

  if (path === "/products") return products as unknown as T;
  if (path === "/products/recommended") return recommended as unknown as T;
  if (path === "/products/featured") return featured as unknown as T;
  if (path.startsWith("/products/")) {
    const id = path.split("/")[2];
    const p = products.find((x) => x.id === id);
    if (!p) throw { status: 404, message: "Product not found" };
    return p as unknown as T;
  }
  if (path === "/categories") return categories as unknown as T;
  if (path === "/suppliers") return suppliers as unknown as T;
  if (path === "/orders") return orders as unknown as T;
  if (path.startsWith("/chat/")) {
    const id = path.split("/")[2];
    return (chatThreads[id] ?? []) as unknown as T;
  }

  throw { status: 404, message: `Mock route not found: ${path}` };
}
