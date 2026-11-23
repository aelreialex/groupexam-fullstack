import { Section } from '@app/section';
import { SectionTitle } from '@app/section-title';
import { Pamphlet } from '@app/pamphlet';
import { Button } from '@app/button';
import { useId, useState } from 'react';
import { CartItemRow } from '@app/cart-drawer';
import { ProductOptions } from '@app/product-card';
import type { CartItem } from '../../core/cart/cart.types';
import {
	MAX_EXTRAS_PER_MEAL,
	MAX_CONDIMENTS_PER_MEAL,
} from '../../core/cart/cart.constants';
import { getUnitPrice } from '../../core/cart/cart.utils';

const previewProduct: CartItem['product'] = {
	_id: 'preview-meal',
	name: 'korv med bröd',
	price: 25,
	image: '',
	category: 'meal',
	ingredients: [],
	extras: [
		{
			_id: 'preview-onion',
			name: 'rostad lök',
			role: 'topping',
			price: 5,
			allergens: [],
			isCustomizable: true,
			inStock: true,
		},
		{
			_id: 'preview-shrimp',
			name: 'extra räksallad',
			role: 'topping',
			price: 15,
			allergens: ['egg'],
			isCustomizable: true,
			inStock: true,
		},
	],
	condiments: [
		{
			_id: 'preview-mustard',
			name: 'senap',
			role: 'condiment',
			price: 0,
			allergens: [],
			isCustomizable: true,
			inStock: true,
		},
	],
	onMenu: true,
	isLunch: false,
	inStock: true,
	sortOrder: 0,
};

const previewItem: CartItem = {
	id: 'preview-row',
	product: previewProduct,
	quantity: 1,
	selectedExtras: [previewProduct.extras[1]!],
	selectedCondiments: [previewProduct.condiments[0]!],
};

export function CheckoutPage() {
	const optionsId = useId();
	const [quantity, setQuantity] = useState(previewItem.quantity);
	const [selectedExtraIds, setSelectedExtraIds] = useState(
		previewItem.selectedExtras.map((extra) => extra._id),
	);

	const [selectedCondimentIds, setSelectedCondimentIds] = useState(
		previewItem.selectedCondiments.map((condiment) => condiment._id),
	);

	const currentItem: CartItem = {
		...previewItem,
		quantity,
		selectedExtras: previewProduct.extras.filter((extra) =>
			selectedExtraIds.includes(extra._id),
		),
		selectedCondiments: previewProduct.condiments.filter((condiment) =>
			selectedCondimentIds.includes(condiment._id),
		),
	};

	function toggleExtra(id: string) {
		setSelectedExtraIds((ids) => {
			if (ids.includes(id)) {
				return ids.filter((selectedId) => selectedId !== id);
			}

			return ids.length < MAX_EXTRAS_PER_MEAL ? [...ids, id] : ids;
		});
	}

	function toggleCondiment(id: string) {
		setSelectedCondimentIds((ids) => {
			if (ids.includes(id)) {
				return ids.filter((selectedId) => selectedId !== id);
			}

			return ids.length < MAX_CONDIMENTS_PER_MEAL ? [...ids, id] : ids;
		});
	}
	return (
		<Section>
			<div className='mb-8 space-y-3'>
				<SectionTitle as='h1' eyebrow='Sista stoppet före betalning'>
					Checkout
				</SectionTitle>

				<p className='font-kalam'>
					Se över beställningen. Nisse börjar inte grilla förrän du har betalat.
				</p>
			</div>

			<div className='grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
				<Pamphlet
					title='Din beställning'
					headerAside={
						<span className='shrink-0 text-xs font-bold uppercase'>
							{quantity} {quantity === 1 ? 'vara' : 'varor'}
						</span>
					}>
					<ul>
						<CartItemRow
							item={currentItem}
							onQuantityChange={(_, nextQuantity) => setQuantity(nextQuantity)}>
							<p className='mb-2 text-xs font-bold uppercase text-brand-primary'>
								Tillval
							</p>

							<ProductOptions
								product={currentItem.product}
								alwaysExpanded
								isExpanded
								extrasId={optionsId}
								onToggleExpanded={() => {}}
								selectedExtraIds={selectedExtraIds}
								selectedCondimentIds={selectedCondimentIds}
								toggleExtra={toggleExtra}
								toggleCondiment={toggleCondiment}
							/>
						</CartItemRow>
					</ul>
				</Pamphlet>

				<Pamphlet title='Att betala'>
					<div className='space-y-4'>
						<div className='flex items-baseline justify-between gap-4'>
							<span className='font-bold'>Totalt</span>
							<span className='font-alfa-slab-one text-2xl text-brand-primary'>
								{getUnitPrice(currentItem) * currentItem.quantity} kr
							</span>
						</div>

						<Button className='w-full'>Fortsätt till betalning</Button>
					</div>
				</Pamphlet>
			</div>
		</Section>
	);
}
