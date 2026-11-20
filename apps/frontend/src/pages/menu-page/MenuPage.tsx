import type { Menu } from '@app/shared';
import { useOutletContext } from 'react-router-dom';
import { ProductCard } from '@app/product-card';
import { Pamphlet } from '@app/pamphlet';
import { ProductCardGrid } from '@app/product-card-grid';
import { Section } from '@app/section';
import { SectionTitle } from '@app/section-title';
import { DrinkRow } from '@app/drink-row';
import { useState } from 'react';

export function MenuPage() {
	const menu = useOutletContext<Menu | undefined>();
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
				{menu?.meals.map((meal) => (
					<ProductCard
						key={meal._id}
						product={meal}
						imageSrc={meal.image}
						imageAlt={meal.name}
					/>
				))}
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

					{menu?.drinks.map((drink) => (
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
