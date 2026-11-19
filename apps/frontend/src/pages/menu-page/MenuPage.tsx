import { createProductSchema } from '@app/shared';
import { ProductCard } from '@app/product-card';
import korvImage from '../../assets/korv-m-brod.png';
import { Pamphlet } from '@app/pamphlet';
import { ProductCardGrid } from '@app/product-card-grid';
import { Section } from '@app/section';
import { SectionTitle } from '@app/section-title';
import { DrinkRow } from '@app/drink-row';
import { useState } from 'react';

const exampleProduct = createProductSchema.parse({
	_id: 'meal-1',
	name: 'Grillad korv med bröd',
	price: 30,
	description:
		'Ordentligt grillad i mjukt bröd, med senap, ketchup och rostad lök.',
	nisseQuote: 'Lite stökig. Precis som det ska vara.',
	sortOrder: 0,
	ingredients: [
		{
			_id: 'ingredient-bread',
			name: 'Korvbröd',
			role: 'base',
		},
		{
			_id: 'ingredient-sausage',
			name: 'Grillkorv',
			role: 'sausage',
		},
	],
	extras: [
		{
			_id: 'extra-onion',
			name: 'Extra rostad lök',
			role: 'topping',
			price: 5,
			isCustomizable: true,
		},
		{
			_id: 'extra-salad',
			name: 'Extra räksallad',
			role: 'topping',
			price: 10,
			isCustomizable: true,
		},
	],
});

const exampleDrinks = createProductSchema.array().parse([
	{
		_id: 'drink-coffee',
		name: 'Kaffe ur termos',
		description: 'Starkt och varmt',
		price: 22,
		category: 'drink',
		sortOrder: 0,
	},
	{
		_id: 'drink-pucko',
		name: 'Pucko',
		description: 'Kall. Oftast',
		price: 22,
		category: 'drink',
		sortOrder: 1,
	},
	{
		_id: 'drink-soda',
		name: 'Läsk',
		description: 'Den som finns i kylen.',
		price: 20,
		category: 'drink',
		sortOrder: 2,
	},
]);

export function MenuPage() {
	const [drinkQuantities, setDrinkQuantities] = useState<
		Record<string, number>
	>({});

	return (
		<Section>
			<div className='mb-6 space-y-3'>
				<SectionTitle as='h1' eyebrow='Korv, mos och annat viktigt'>
					Menyn
				</SectionTitle>

				<p className='font-kalam'>
					Den har inte ändrats mycket sen -71. Varför skulle den?
				</p>
			</div>
			<ProductCardGrid>
				<ProductCard
					product={exampleProduct}
					imageSrc={korvImage}
					imageAlt='Grillad korv med bröd'
				/>
				<ProductCard
					product={exampleProduct}
					imageSrc={korvImage}
					imageAlt='Grillad korv med bröd'
				/>
				<ProductCard
					product={exampleProduct}
					imageSrc={korvImage}
					imageAlt='Grillad korv med bröd'
				/>
				<ProductCard
					product={exampleProduct}
					imageSrc={korvImage}
					imageAlt='Grillad korv med bröd'
				/>
				<ProductCard
					product={exampleProduct}
					imageSrc={korvImage}
					imageAlt='Grillad korv med bröd'
				/>
				<ProductCard
					product={exampleProduct}
					imageSrc={korvImage}
					imageAlt='Grillad korv med bröd'
				/>
			</ProductCardGrid>
			<div className='mt-8'>
				<Pamphlet
					title='Att dricka'
					contentClassName='mx-auto w-full max-w-2xl'>
					<div className='space-y-3'>
						<p className='text-sm text-text-secondary'>
							Läggs till separat i din beställning.
						</p>
					</div>

					{exampleDrinks.map((drink) => (
						<DrinkRow
							key={drink._id}
							product={drink}
							quantity={drinkQuantities[drink._id] ?? 0}
							onQuantityChange={(quantity) =>
								setDrinkQuantities((current) => ({
									...current,
									[drink._id]: quantity,
								}))
							}
						/>
					))}
				</Pamphlet>
			</div>
		</Section>
	);
}
