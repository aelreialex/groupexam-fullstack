import { ProductCard } from '@app/product-card';
import korvImage from '../../assets/korv-m-brod.png';

export function MenuPage() {
	return (
		<div>
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
