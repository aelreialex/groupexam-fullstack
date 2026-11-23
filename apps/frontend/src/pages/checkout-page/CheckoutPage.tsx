import { Section } from '@app/section';
import { SectionTitle } from '@app/section-title';
import { Pamphlet } from '@app/pamphlet';
import { Button } from '@app/button';
import { useId } from 'react';
import { CartItemRow } from '@app/cart-drawer';
import { ProductOptions } from '@app/product-card';
import type { CartItem } from '../../core/cart/cart.types';

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
						<span className='shrink-0 text-xs font-bold uppercase'>1 vara</span>
					}>
					<ul>
						<CartItemRow item={previewItem} onQuantityChange={() => {}}>
							<p className='mb-2 text-xs font-bold uppercase text-brand-primary'>
								Tillval
							</p>

							<ProductOptions
								product={previewItem.product}
								alwaysExpanded
								isExpanded
								extrasId={optionsId}
								onToggleExpanded={() => {}}
								selectedExtraIds={previewItem.selectedExtras.map(
									(extra) => extra._id,
								)}
								selectedCondimentIds={previewItem.selectedCondiments.map(
									(condiment) => condiment._id,
								)}
								toggleExtra={() => {}}
								toggleCondiment={() => {}}></ProductOptions>
						</CartItemRow>
					</ul>
				</Pamphlet>

				<Pamphlet title='Att betala'>
					<div className='space-y-4'>
						<div className='flex items-baseline justify-between gap-4'>
							<span className='font-bold'>Totalt</span>
							<span className='font-alfa-slab-one text-2xl text-brand-primary'>
								94 kr
							</span>
						</div>

						<Button className='w-full'>Fortsätt till betalning</Button>
					</div>
				</Pamphlet>
			</div>
		</Section>
	);
}
