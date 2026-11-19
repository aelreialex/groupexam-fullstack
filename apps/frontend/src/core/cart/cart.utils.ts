import type { CartItem } from './cart.types';

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
