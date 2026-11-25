import type { CreateOrder, Product } from '@app/shared';
import type { CartItem } from './cart.types';

export function toggleSelection(ids: string[], id: string, max: number) {
	if (ids.includes(id)) {
		return ids.filter((selectedId) => selectedId !== id);
	}

	return ids.length < max ? [...ids, id] : ids;
}

export function getUnitPrice(item: CartItem) {
	const extrasPrice = item.selectedExtras.reduce(
		(sum, extra) => sum + extra.price,
		0,
	);

	const condimentsPrice = item.selectedCondiments.reduce(
		(sum, condiment) => sum + condiment.price,
		0,
	);

	return item.product.price + extrasPrice + condimentsPrice;
}

export function getCartTotal(items: CartItem[]) {
	return items.reduce(
		(total, item) => total + getUnitPrice(item) * item.quantity,
		0,
	);
}

export function getSelectionKey(
	productId: string,
	extras: Product['extras'],
	condiments: Product['condiments'],
) {
	return JSON.stringify([
		productId,
		extras.map((extra) => extra._id).sort(),
		condiments.map((condiment) => condiment._id).sort(),
	]);
}

export function createOrderBody(items: CartItem[]): CreateOrder {
	return {
		cart: items.map((item) => ({
			type: 'product',
			productId: item.product._id,
			quantity: item.quantity,
			extras: item.selectedExtras.map((extra) => extra._id),
			condiments: item.selectedCondiments.map((condiment) => condiment._id),
		})),
	};
}
