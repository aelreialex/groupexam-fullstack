import type { Product } from '@app/shared';
import { useCart } from './CartProvider';

export function useDrinkCart() {
	const { items, addItem, changeQuantity } = useCart();

	function getQuantity(productId: string) {
		return items.find((item) => item.product._id === productId)?.quantity ?? 0;
	}

	function setQuantity(drink: Product, quantity: number) {
		const item = items.find((item) => item.product._id === drink._id);

		if (item) {
			changeQuantity(item.id, quantity);
		} else if (quantity > 0 && drink.inStock) {
			addItem(drink);
		}
	}

	return { getQuantity, setQuantity };
}
