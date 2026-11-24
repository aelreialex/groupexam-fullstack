import type { Product } from '@app/shared';

export type CartItem = {
	id: string;
	product: Product;
	quantity: number;
	selectedExtras: Product['extras'];
	selectedCondiments: Product['condiments'];
};
