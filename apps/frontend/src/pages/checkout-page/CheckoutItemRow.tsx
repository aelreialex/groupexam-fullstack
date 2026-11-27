import { useId } from 'react';
import { CartItemRow } from '@app/cart-drawer';
import { ProductOptions } from '@app/product-card';
import type { CartItem } from '../../core/cart/cart.types';
import { useProductSelection } from '../../core/menu/useProductSelection';

type CheckoutItemRowProps = {
	item: CartItem;
	onQuantityChange: (id: string, quantity: number) => void;
};

export function CheckoutItemRow({
	item,
	onQuantityChange,
}: CheckoutItemRowProps) {
	const optionsId = useId();

	const {
		selectedExtraIds,
		selectedCondimentIds,
		toggleExtra,
		toggleCondiment,
	} = useProductSelection(item.product, item.id);

	const hasOptions =
		item.product.category === 'meal' &&
		(item.product.extras.length > 0 || item.product.condiments.length > 0);

	return (
		<CartItemRow item={item} onQuantityChange={onQuantityChange} showRemove>
			{hasOptions ? (
				<>
					<p className='mb-2 text-xs font-bold uppercase text-brand-primary'>
						Tillval
					</p>

					<ProductOptions
						product={item.product}
						alwaysExpanded
						isExpanded
						extrasId={optionsId}
						onToggleExpanded={() => {}}
						selectedExtraIds={selectedExtraIds}
						selectedCondimentIds={selectedCondimentIds}
						toggleExtra={toggleExtra}
						toggleCondiment={toggleCondiment}
					/>
				</>
			) : null}
		</CartItemRow>
	);
}
