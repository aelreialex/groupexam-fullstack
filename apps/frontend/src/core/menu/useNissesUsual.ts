import type { Menu } from '@app/shared';
import { useCart } from '../cart/CartProvider';

export function useNissesUsusal(menu: Menu | undefined) {
	const { addItem } = useCart();

	const meal = menu?.meals.find((meal) => meal.name === 'Kokt med bröd');
	const roastedOnion = meal?.extras.find(
		(extra) => extra.name === 'Rostad lök',
	);
	const shrimpSalad = meal?.extras.find((extra) => extra.name === 'Räksallad');

	const isAvailable = Boolean(
		meal?.inStock && roastedOnion?.inStock && shrimpSalad?.inStock,
	);

	const price =
		meal && roastedOnion && shrimpSalad
			? meal.price + roastedOnion.price + shrimpSalad.price
			: undefined;

	function addToCart() {
		if (!isAvailable || !meal || !roastedOnion || !shrimpSalad) return;

		addItem(meal, [roastedOnion, shrimpSalad]);
	}

	return { price, isAvailable, addToCart };
}
