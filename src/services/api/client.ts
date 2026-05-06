/**
 * Tiny fetch-based API client. In a real app, swap for axios or ky.
 * Centralized so TanStack Query hooks stay thin.
 */
const BASE_URL = ""; // mock

export type ApiError = { status: number; message: string };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  // For demo: route everything through mocks. Replace with real fetch.
  const { mockApi } = await import("./mock");
  return mockApi<T>(path, init);
}

export const api = {
  get: <T,>(path: string) => request<T>(path),
  post: <T,>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } }),
};

export { BASE_URL };
