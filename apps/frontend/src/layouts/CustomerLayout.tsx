import { Outlet } from 'react-router-dom';
import { Header } from '@app/header';
import { Footer } from '@app/footer';

function CustomerLayout() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />

			<main className='w-full flex-1'>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

export default CustomerLayout;
