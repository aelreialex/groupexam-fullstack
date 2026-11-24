import { useState } from 'react';
import type { Product } from '@app/shared';
import { useCartStore } from '../cart/cart.store';
import {
	MAX_EXTRAS_PER_MEAL,
	MAX_CONDIMENTS_PER_MEAL,
} from '../cart/cart.constants';
import { toggleSelection } from '../cart/cart.utils';

export function useProductSelection(product: Product) {
	const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
	const [selectedCondimentIds, setSelectedCondimentIds] = useState<string[]>(
		[],
	);
	const addItem = useCartStore((state) => state.addItem);

	function toggleExtra(id: string) {
		setSelectedExtraIds((ids) => toggleSelection(ids, id, MAX_EXTRAS_PER_MEAL));
	}

	function toggleCondiment(id: string) {
		setSelectedCondimentIds((ids) =>
			toggleSelection(ids, id, MAX_CONDIMENTS_PER_MEAL),
		);
	}

	function addToCart() {
		if (!product.inStock) return;

		const extras = product.extras.filter(
			(extra) => selectedExtraIds.includes(extra._id) && extra.inStock,
		);

		const condiments = product.condiments.filter(
			(condiment) =>
				selectedCondimentIds.includes(condiment._id) && condiment.inStock,
		);

		addItem(product, extras, condiments);
		setSelectedExtraIds([]);
		setSelectedCondimentIds([]);
	}

	const selectedIngredients = [
		...product.ingredients,
		...product.extras.filter(
			(extra) => selectedExtraIds.includes(extra._id) && extra.inStock,
		),
		...product.condiments.filter(
			(condiment) =>
				selectedCondimentIds.includes(condiment._id) && condiment.inStock,
		),
	];

	const allergens = [
		...new Set(
			selectedIngredients.flatMap((ingredient) => ingredient.allergens),
		),
	].sort();

	return {
		selectedExtraIds,
		selectedCondimentIds,
		toggleExtra,
		toggleCondiment,
		addToCart,
		allergens,
	};
}
