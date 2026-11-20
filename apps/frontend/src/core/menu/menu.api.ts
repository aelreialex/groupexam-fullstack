import type { ApiResponse, Menu } from "@app/shared";

const API_URL = import.meta.env.VITE_API_URL;

export async function getMenu(): Promise<Menu> {
  const response = await fetch(`${API_URL}/api/menu`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch menu: ${response.status} ${response.statusText}`,
    );
  }

  const result: ApiResponse<Menu> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.message ?? "Failed to fetch menu");
  }

  return result.data;
}
