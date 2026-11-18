import { SectionTitle } from '@app/section-title';

export function HomePage() {
	return (
		<div>
			<section className='py-12'>
				<div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
					<p>Här kommer hero-innehållet.</p>
				</div>
			</section>

			<section className='py-12'>
				<div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
						<SectionTitle eyebrow='Serveras 11-14'>Dagens lunch</SectionTitle>

						<p className='font-kalam text-sm'>
							"Det som står framme är dagens"
						</p>
					</div>
				</div>
			</section>

			<section className='bg-bg-section-alternate py-12'>
				<div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
					<SectionTitle eyebrow='Varje dag sen 1971'>Om Nisse</SectionTitle>
				</div>
			</section>

			<section className='py-12'>
				<div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
					<SectionTitle eyebrow='Stortorget · mitt i stan'>
						Hitta hit
					</SectionTitle>
				</div>
			</section>
		</div>
	);
}
