import { Outlet, useMatch } from 'react-router-dom';
import { StaffHeader } from '@app/staff-header';

function StaffLayout() {
	const isOrdersPage = useMatch('/staff/orders') !== null;
	return (
		<div className='flex flex-col min-h-screen'>
			<StaffHeader showUserInfo={isOrdersPage} />

			<main className='w-full flex-1'>
				<Outlet />
			</main>
		</div>
	);
}

export default StaffLayout;
