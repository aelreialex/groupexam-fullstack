import {
	createContext,
	useCallback,
	useContext,
	useState,
	type ReactNode,
} from 'react';
import type { CartItem } from './cart.types';
import type { Product } from '@app/shared';

type CartContextValue = {
	items: CartItem[];
	changeQuantity: (id: string, quantity: number) => void;
	addItem: (
		product: Product,
		selectedExtras?: Product['extras'],
		selectedCondiments?: Product['condiments'],
	) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);

	const changeQuantity = useCallback((id: string, quantity: number) => {
		setItems((currentItems) =>
			currentItems
				.map((item) => (item.id === id ? { ...item, quantity } : item))
				.filter((item) => item.quantity > 0),
		);
	}, []);

	const addItem = useCallback(
		(
			product: Product,
			selectedExtras: Product['extras'] = [],
			selectedCondiments: Product['condiments'] = [],
		) => {
			const selectionKey = getSelectionKey(
				product._id,
				selectedExtras,
				selectedCondiments,
			);

			const newItem: CartItem = {
				id: crypto.randomUUID(),
				product,
				quantity: 1,
				selectedExtras: [...selectedExtras],
				selectedCondiments: [...selectedCondiments],
			};

			setItems((currentItems) => {
				const existingItem = currentItems.find(
					(item) =>
						getSelectionKey(
							item.product._id,
							item.selectedExtras,
							item.selectedCondiments,
						) === selectionKey,
				);

				if (existingItem) {
					return currentItems.map((item) =>
						item.id === existingItem.id
							? { ...item, quantity: Math.min(99, item.quantity + 1) }
							: item,
					);
				}

				return [...currentItems, newItem];
			});
		},
		[],
	);

	return (
		<CartContext.Provider value={{ items, changeQuantity, addItem }}>
			{children}
		</CartContext.Provider>
	);
}

function getSelectionKey(
	productId: string,
	extras: Product['extras'],
	condiments: Product['condiments'],
) {
	return JSON.stringify([
		productId,
		extras.map((extra) => extra._id).sort(),
		condiments.map((condiment) => condiment._id).sort(),
	]);
}

export function useCart() {
	const context = useContext(CartContext);

	if (context === null) {
		throw new Error('useCart måste användas inuti CartProvider');
	}

	return context;
}
