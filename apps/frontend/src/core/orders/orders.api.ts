import {
	createOrderSchema,
	type ApiResponse,
	type CreateOrder,
	type Order,
} from '@app/shared';

const API_URL = import.meta.env.VITE_API_URL;

export async function createOrder(body: CreateOrder): Promise<Order> {
	const validatedBody = createOrderSchema.parse(body);

	const response = await fetch(`${API_URL}/api/orders`, {
		method: 'POST',
		headers: {
			'content-Type': 'application/json',
		},
		body: JSON.stringify(validatedBody),
	});

	const result: ApiResponse<Order> = await response.json();

	if (!response.ok || !result.success || !result.data) {
		throw new Error(result.message ?? 'Kunde inte skapa beställningen');
	}

	return result.data;
}
