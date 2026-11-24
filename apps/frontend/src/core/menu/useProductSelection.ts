import { useState } from 'react';
import type { Product } from '@app/shared';
import { useCartStore } from '../cart/cart.store';
import {
	MAX_EXTRAS_PER_MEAL,
	MAX_CONDIMENTS_PER_MEAL,
} from '../cart/cart.constants';
import { toggleSelection } from '../cart/cart.utils';

export function useProductSelection(product: Product, cartItemId?: string) {
	const [localExtraIds, setSelectedExtraIds] = useState<string[]>([]);
	const [localCondimentIds, setSelectedCondimentIds] = useState<string[]>([]);
	const addItem = useCartStore((state) => state.addItem);
	const updateItemOptions = useCartStore((state) => state.updateItemOptions);

	const cartItem = useCartStore((state) =>
		state.items.find((item) => item.id === cartItemId),
	);

	const isEditing = cartItemId !== undefined;

	const selectedExtraIds = isEditing
		? (cartItem?.selectedExtras.map((extra) => extra._id) ?? [])
		: localExtraIds;

	const selectedCondimentIds = isEditing
		? (cartItem?.selectedCondiments.map((condiment) => condiment._id) ?? [])
		: localCondimentIds;

	function toggleExtra(id: string) {
		const option = product.extras.find((extra) => extra._id === id);

		if (!option) return;
		if (!option.inStock && !selectedExtraIds.includes(id)) return;

		const nextIds = toggleSelection(selectedExtraIds, id, MAX_EXTRAS_PER_MEAL);

		if (isEditing) {
			if (!cartItem) return;

			updateItemOptions(
				cartItem.id,
				product.extras.filter((extra) => nextIds.includes(extra._id)),
				cartItem.selectedCondiments,
			);
		} else {
			setSelectedExtraIds(nextIds);
		}
	}

	function toggleCondiment(id: string) {
		const option = product.condiments.find((condiment) => condiment._id === id);

		if (!option) return;
		if (!option.inStock && !selectedCondimentIds.includes(id)) return;

		const nextIds = toggleSelection(
			selectedCondimentIds,
			id,
			MAX_CONDIMENTS_PER_MEAL,
		);

		if (isEditing) {
			if (!cartItem) return;

			updateItemOptions(
				cartItem.id,
				cartItem.selectedExtras,
				product.condiments.filter((condiment) =>
					nextIds.includes(condiment._id),
				),
			);
		} else {
			setSelectedCondimentIds(nextIds);
		}
	}

	function addToCart() {
		if (isEditing || !product.inStock) return;

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
