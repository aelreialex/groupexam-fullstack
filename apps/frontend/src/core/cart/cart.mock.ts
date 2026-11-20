import type { CartItem } from './cart.types';

export const mockCartItems: CartItem[] = [
	{
		id: 'test-row-1',
		product: {
			_id: 'test-product-1',
			name: 'Grillad korv med bröd',
			price: 50,
			image: '',
			category: 'meal',
			ingredients: [],
			extras: [],
			condiments: [],
			onMenu: true,
			isLunch: false,
			inStock: true,
			sortOrder: 0,
		},
		quantity: 2,
		selectedExtras: [],
		selectedCondiments: [],
	},
];
