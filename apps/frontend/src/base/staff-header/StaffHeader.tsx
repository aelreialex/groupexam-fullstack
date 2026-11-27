import logo from '../../assets/images/Logo.svg';

type StaffHeaderProps = {
	showUserInfo?: boolean;
};

export function StaffHeader({ showUserInfo = false }: StaffHeaderProps) {
	return (
		<header className='sticky top-0 z-30 w-full border-b border-border-strong bg-bg-staff-header'>
			<div
				className='
          mx-auto max-w-6xl 
          flex flex-row items-center justify-between gap-4
          px-4 py-2
        '>
				<div className='flex flex-col items-center gap-4 md:flex-row'>
					<img src={logo} alt='Nisses Korvmoj' className='w-32' />

					<div className='leading-tight'>
						<p className='font-alfa-slab-one text-sm text-brand-primary'>
							PERSONAL
						</p>
						<p className='text-xs font-semibold tracking-wide'>
							ORDERHANTERING
						</p>
					</div>
				</div>

				{showUserInfo && (
					<div
						className='
            flex items-center gap-2 
            text-xs 
            self-start md:self-center
            mt-4 md:mt-0
          '>
						<div className='text-right leading-tight'>
							<p className='text-[8px] uppercase text-text-secondary'>
								Inloggad som
							</p>
							<p className='font-semibold'>Elin Larsson</p>
						</div>
						<span
							aria-hidden='true'
							className='h-6 border-l border-border-subtle'
						/>
						<span
							className='
            font-semibold 
            cursor-pointer
            hover:border-b active:border-b active:text-brand-primary
            '>
							Logga ut
						</span>
					</div>
				)}
			</div>
		</header>
	);
}
