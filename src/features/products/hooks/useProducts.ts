import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/client";
import { queryKeys } from "@/services/api/queryKeys";
import type { Product } from "@/types";

export function useProducts() {
  return useQuery({ queryKey: queryKeys.products.all, queryFn: () => api.get<Product[]>("/products") });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.products.detail(id ?? ""),
    queryFn: () => api.get<Product>(`/products/${id}`),
    enabled: !!id,
  });
}

export function useRecommended() {
  return useQuery({ queryKey: queryKeys.products.recommended, queryFn: () => api.get<Product[]>("/products/recommended") });
}

export function useFeatured() {
  return useQuery({ queryKey: queryKeys.products.featured, queryFn: () => api.get<Product[]>("/products/featured") });
}
