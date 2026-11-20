import type { ApiResponse, Menu } from '@app/shared';

export async function getMenu(): Promise<Menu> {
	const response = await fetch('/api/menu');

	if (!response.ok) {
		throw new Error(
			`Failed to fetch menu: ${response.status} ${response.statusText}`,
		);
	}

	const result: ApiResponse<Menu> = await response.json();

	if (!result.success || !result.data) {
		throw new Error(result.message ?? 'Failed to fetch menu');
	}

	return result.data;
}
