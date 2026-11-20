import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { Header } from '@app/header';
import { Footer } from '@app/footer';
import { useState } from 'react';
import { CartDrawer } from '@app/cart-drawer';
import { useCart } from '../core/cart/CartProvider';
import { getMenu } from '../core/menu/menu.api';

function CustomerLayout() {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const { data: menu } = useQuery({
		queryKey: ['menu'],
		queryFn: getMenu,
	});

	const { items: cartItems, changeQuantity } = useCart();

	const cartQuantity = cartItems.reduce(
		(total, item) => total + item.quantity,
		0,
	);

	return (
		<div className='flex flex-col min-h-screen'>
			<Header
				onOpenCart={() => setIsCartOpen(true)}
				cartQuantity={cartQuantity}
			/>

			<CartDrawer
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				items={cartItems}
				onQuantityChange={changeQuantity}
			/>

			<main className='w-full flex-1'>
				<Outlet context={menu} />
			</main>

			<Footer />
		</div>
	);
}

export default CustomerLayout;
