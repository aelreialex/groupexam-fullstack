import type { Menu } from '@app/shared';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useNissesUsusal } from '../../core/menu/useNissesUsual';

import { SectionTitle } from '@app/section-title';
import { Pamphlet } from '@app/pamphlet';
import { ProductCard } from '@app/product-card';
import { Section } from '@app/section';
import { ProductCardGrid } from '../../base/product-card-grid';
import { Button } from '../../base/button/Button';

import korvImage from '../../assets/korv-m-brod.png';
import LogoLg from '../../assets/images/LogoLg.svg';
import NisseHead from '../../assets/images/NisseHead.svg';
import NisseFullSm from '../../assets/images/NisseFullSm.svg';
import NisseFullLg from '../../assets/images/NisseFullLg.svg';
import Star from '../../assets/images/Star.svg';

export function HomePage() {
	const menu = useOutletContext<Menu | undefined>();
	const lunchMeals = menu?.meals.filter((meal) => meal.isLunch) ?? [];

	const navigate = useNavigate();
	const nissesUsual = useNissesUsusal(menu);

	return (
		<div>
			{/* HERO SECTION */}
			<Section>
				<div className='flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16'>
					<div
						className='
              flex w-full flex-col items-center gap-6
              lg:w-5/12 lg:items-start
            '>
						<img className='w-full max-w-98.75' src={LogoLg} alt='Stor logga' />

						<p className='max-w-lg leading-relaxed'>
							Ett skjul mitt på torget. Rostig plåt, en grill som aldrig
							slocknar och en gubbe som inte tänker le. Korven är däremot
							fantastisk.
						</p>

						<aside className='flex items-start gap-2'>
							<img className='w-20' src={NisseHead} alt='Nisse huvud' />

							<span
								className='
                  rounded-2xl border-2 border-border-strong
                  bg-bg-surface p-3
                  font-kalam text-lg
                '>
								Jaha, hungrig igen?
							</span>
						</aside>

						<div className='flex flex-wrap gap-4'>
							<Button
								onClick={nissesUsual.addToCart}
								disabled={!nissesUsual.isAvailable}>
								Nisses vanliga{' '}
								{nissesUsual.price !== undefined &&
									` · ${nissesUsual.price} kr`}
							</Button>
							<Button variant='secondary' onClick={() => navigate('/menu')}>
								Se hela menyn
							</Button>
						</div>
					</div>

					<div className='hidden w-full md:block lg:w-7/12'>
						<div className='relative mx-auto max-w-2xl lg:max-w-none'>
							<article
								className='
                  absolute -top-6 left-3 z-10
                  w-44 -rotate-6
                  border-4 border-border-pamphlet
                  bg-bg-surface p-2
                  shadow-[0_10px_24px_-14px_#382b22]
                '>
								<h3 className='font-alfa-slab-one text-lg text-brand-primary'>
									SEDAN ALLTID
								</h3>
							</article>

							<figure
								className='
                  aspect-4/3 overflow-hidden
                  rotate-1
                  border-4 border-border-strong
                  shadow-[0_8px_18px_0_rgba(48,30,20,0.35)]
                '>
								<img
									className='h-full w-full object-cover'
									src={korvImage}
									alt='Bild på korv'
								/>
							</figure>

							<aside className='pointer-events-none absolute -bottom-8 -left-10'>
								<img src={NisseFullSm} alt='Nisse helkropp' />
							</aside>
						</div>
					</div>
				</div>

				<div className='mx-auto mt-12 w-full'>
					<div className='h-px bg-border-subtle' />
				</div>
			</Section>

			{/* PRODUCT SECTION */}
			<Section>
				<div className='mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
					<SectionTitle eyebrow='Serveras 11-14'>Dagens lunch</SectionTitle>

					<p className='font-kalam text-md'>"Det som står framme är dagens"</p>
				</div>

				<ProductCardGrid>
					{lunchMeals.map((meal) => (
						<ProductCard
							key={meal._id}
							product={meal}
							imageSrc={meal.image}
							imageAlt={meal.name}
						/>
					))}
				</ProductCardGrid>
			</Section>

			{/* ABOUT SECTION */}
			<Section background>
				<div className='flex flex-col gap-12 sm:flex-row sm:items-center sm:gap-10'>
					<div className='w-full lg:w-5/12 hidden sm:block'>
						<div className='flex gap-4'>
							<figure className='flex-3 max-w-50 md:max-w-none'>
								<img src={NisseFullLg} alt='Nisse helkropp' />
							</figure>

							<span className='flex-1'>
								<img src={Star} alt='Stjärna' />
							</span>
						</div>
					</div>

					<div
						className='
              flex w-full flex-col gap-6
              lg:w-7/12 
            '>
						<SectionTitle eyebrow='Varje dag sen 1971'>Om Nisse</SectionTitle>

						<span className='font-kalam text-xl'>
							“Ta en till. Du ser tunn ut.”
						</span>

						<div className='flex flex-col gap-2 max-w-lg leading-relaxed'>
							<p>
								Ingen vet riktigt när Nisse började. Torget byggdes runt
								korvmojen, säger vissa. Själv svarar han inte på frågan.
							</p>
							<p>
								Linnet var vitt en gång. Kepsen har aldrig varit av.
								Gummistövlarna sitter på året om, och grilltången ligger alltid
								inom räckhåll.
							</p>
						</div>

						<span className='font-kalam text-xl'>“Prata mindre. Ät mer.”</span>
					</div>
				</div>
			</Section>

			{/* FIND US SECTION */}
			<Section>
				<div className='flex flex-col gap-12 sm:flex-row sm:items-center sm:gap-10'>
					<div
						className='
              flex w-full flex-col gap-6
              lg:w-7/12 
            '>
						<SectionTitle eyebrow='Stortorget · mitt i stan'>
							Hitta hit
						</SectionTitle>
						<p className='max-w-lg leading-relaxed'>
							Mitt på Stortorget. Det gamla skjulet med rostigt tak. Du kan inte
							missa det.
						</p>

						<span className='font-kalam text-xl'>“Följ röken.”</span>
					</div>

					<div className='w-full lg:w-5/12'>
						<Pamphlet title='Öppet' rotate>
							<div
								className='
                    flex flex-col
                    gap-3 py-4
                    border-t border-dashed border-border-subtle
                    sm:flex-row sm:items-center sm:justify-between'>
								<div className='min-w-0'>
									<h3>Måndag - torsdag</h3>
								</div>

								<div className='flex shrink-0 items-center gap-4'>
									<p className='text-sm font-bold'>11-21</p>
								</div>
							</div>

							<div
								className='
                    flex flex-col
                    gap-3 py-4
                    border-t border-dashed border-border-subtle
                    sm:flex-row sm:items-center sm:justify-between'>
								<div className='min-w-0'>
									<h3>Fredag - lördag</h3>
								</div>

								<div className='flex shrink-0 items-center gap-4'>
									<p className='text-sm font-bold'>11-02</p>
								</div>
							</div>

							<div
								className='
                    flex flex-col
                    gap-3 py-4
                    border-t border-dashed border-border-subtle
                    sm:flex-row sm:items-center sm:justify-between'>
								<div className='min-w-0'>
									<h3>Söndag</h3>
								</div>

								<div className='flex shrink-0 items-center gap-4'>
									<p className='text-sm font-bold'>12-20</p>
								</div>
							</div>
						</Pamphlet>
					</div>
				</div>
			</Section>
		</div>
	);
}
