import { Button } from '@app/button';
import nisse from '../../assets/images/nisse-big.png';

export function StaffPage() {
	return (
		<section className='mx-auto w-full max-w-6xl px-4 py-12'>
			<div className='grid items-center gap-10 md:grid-cols-2'>
				<div>
					<p className='font-kalam text-3xl'>Dags att rulla igång!</p>
					<img src={nisse} alt='' className='mx-auto mt-4 w-full max-w-sm' />
				</div>

				<div className='rounded-sm border-2 border-border-strong bg-bg-surface p-6 md:p-10'>
					<p className='mb-3 text-sm font-bold text-brand-primary'>
						FÖR PERSONAL
					</p>
					<h1 className='font-alfa-slab-one text-3xl'>Logga in</h1>
					<p className='mt-3 text-text-secondary'>
						Här håller du koll på dagens beställningar.
					</p>

					<form className='mt-8 flex flex-col gap-5'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='username' className='font-bold'>
								Användarnamn
							</label>

							<input
								id='username'
								name='username'
								type='text'
								autoComplete='username'
								placeholder='Ditt användarnamn'
								required
								className='
                                w-full rounded-sm border-2 border-border-strong
                                bg-bg-surface px-4 py-3
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-border-strong'
							/>
						</div>

						<div className='flex flex-col gap-2'>
							<label htmlFor='password' className='font-bold'>
								Lösenord
							</label>

							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								className='
                            w-full rounded-sm border-2 border-border-strong
                            bg-bg-surface px-4 py-3
                            focus-visible:outline-2
                            focus-visible:ouline-offset-4
                            focus-visible:outline-border-strong'
							/>
						</div>

						<Button type='submit' className='mt-2 w-full'>
							Logga in
						</Button>
					</form>
				</div>
			</div>
		</section>
	);
}
