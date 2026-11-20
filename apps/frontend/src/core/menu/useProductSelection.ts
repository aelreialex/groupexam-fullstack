import { useState } from 'react';
import type { Product } from '@app/shared';
import { useCart } from '../cart/CartProvider';
import {
	MAX_EXTRAS_PER_MEAL,
	MAX_CONDIMENTS_PER_MEAL,
} from '../cart/cart.constants';

function toggleSelection(ids: string[], id: string, max: number) {
	if (ids.includes(id)) {
		return ids.filter((selectedId) => selectedId !== id);
	}

	return ids.length < max ? [...ids, id] : ids;
}

export function useProductSelection(product: Product) {
	const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
	const [selectedCondimentIds, setSelectedCondimentIds] = useState<string[]>(
		[],
	);
	const { addItem } = useCart();

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

	return {
		selectedExtraIds,
		selectedCondimentIds,
		toggleExtra,
		toggleCondiment,
		addToCart,
	};
}
