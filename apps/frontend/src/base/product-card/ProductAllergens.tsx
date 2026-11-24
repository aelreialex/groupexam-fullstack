const allergenLabels = {
	gluten: 'Gluten',
	lactose: 'Laktos',
	egg: 'Ägg',
};

type ProductAllergensProps = {
	allergens: (keyof typeof allergenLabels)[];
};

export function ProductAllergens({ allergens }: ProductAllergensProps) {
	return (
		<div className='rounded-sm border border-border-subtle p-3 text-sm'>
			<p className='font-semibold'>Allergener i ditt val</p>

			{allergens.length > 0 ? (
				<ul className='mt-2 flex flex-wrap gap-2'>
					{allergens.map((allergen) => (
						<li
							key={allergen}
							className='rounded-sm bg-bg-surface px-2 py-1 border border-border-subtle'>
							{allergenLabels[allergen]}
						</li>
					))}
				</ul>
			) : (
				<p className='mt-1 text-text-secondary'>Inga allergener registrerade</p>
			)}
		</div>
	);
}
