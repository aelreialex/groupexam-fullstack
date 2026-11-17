import { ProductCard } from '@app/product-card';
import korvImage from '../../assets/korv-m-brod.png';

export function MenuPage() {
	return (
		<div
			className='
		grid grid-cols-1
		items-start
		gap-6
		md:grid-cols-2
		lg:grid-cols-3'>
			<ProductCard
				imageSrc={korvImage}
				imageAlt='Grillad korv med bröd'
				name='Grillad korv med bröd'
				price={30}
				description='Ordentligt grillad i mjukt bröd, med senap, ketchup och rostad lök.'
				comment='Lite stökig. Precis som den ska vara.'
			/>
		</div>
	);
}
