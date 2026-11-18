import { createProductSchema } from '@app/shared';
import { ProductCard } from '@app/product-card';
import korvImage from '../../assets/korv-m-brod.png';

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

export function MenuPage() {
	return (
		<div className='mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8'>
			<div
				className='
		grid grid-cols-1
		items-start
		gap-6
		md:grid-cols-2
		lg:grid-cols-3'>
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
			</div>
		</div>
	);
}
