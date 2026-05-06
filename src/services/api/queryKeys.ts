/**
 * Centralized React Query keys — prevents typos and enables targeted invalidation.
 */
export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters?: Record<string, unknown>) => ["products", "list", filters ?? {}] as const,
    detail: (id: string) => ["products", "detail", id] as const,
    recommended: ["products", "recommended"] as const,
    featured: ["products", "featured"] as const,
  },
  categories: { all: ["categories"] as const },
  suppliers: { all: ["suppliers"] as const },
  orders: { all: ["orders"] as const },
  chat: { thread: (id: string) => ["chat", id] as const },
};
