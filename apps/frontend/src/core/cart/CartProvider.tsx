import {
	createContext,
	useCallback,
	useContext,
	useState,
	type ReactNode,
} from 'react';
import type { CartItem } from './cart.types';

type CartContextValue = {
	items: CartItem[];
	changeQuantity: (id: string, quantity: number) => void;
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

	return (
		<CartContext.Provider value={{ items, changeQuantity }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);

	if (context === null) {
		throw new Error('useCart måste användas inuti CartProvider');
	}

	return context;
}
