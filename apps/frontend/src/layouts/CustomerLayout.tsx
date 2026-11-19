import { Outlet } from 'react-router-dom';
import { Header } from '@app/header';
import { Footer } from '@app/footer';
import { useState } from 'react';
import { CartDrawer } from '@app/cart-drawer';

function CustomerLayout() {
	const [isCartOpen, setIsCartOpen] = useState(false);
	return (
		<div className='flex flex-col min-h-screen'>
			<Header onOpenCart={() => setIsCartOpen(true)} />

			<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

			<main className='w-full flex-1'>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

export default CustomerLayout;
