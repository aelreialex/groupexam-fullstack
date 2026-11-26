import { Button } from '@app/button';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import nisse from '../../assets/images/nisse-big.png';
import { StaffHeading } from '../../assets/images/staff-heading';

export function StaffPage() {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<section className='mx-auto w-full max-w-6xl px-4 pt-6 pb-12 md:pt-12'>
			<div className='grid items-center gap-10 md:grid-cols-2'>
				<div>
					<div className='mx-auto w-full max-w-md -rotate-6'>
						<StaffHeading />
					</div>
					<img
						src={nisse}
						alt=''
						className='mx-auto mt-4 w-full max-w-48 md:max-w-sm'
					/>
					<p className='mt-4 text-center font-kalam text-xl'>
						Välkommen till ett nytt pass.
					</p>
				</div>

				<div className='rounded-2xl border-[3px] border-border-strong bg-bg-surface p-6 md:p-10 shadow-[10px_10px_0_var(--color-border-strong)]'>
					<p className='mb-3 text-sm font-bold text-brand-primary'>
						FÖR PERSONAL
					</p>
					<h1 className='font-alfa-slab-one text-4xl md:text-6xl'>Logga in</h1>
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

							<div className='relative'>
								<input
									id='password'
									name='password'
									type={showPassword ? 'text' : 'password'}
									autoComplete='current-password'
									required
									className='
                            w-full rounded-sm border-2 border-border-strong
                            bg-bg-surface px-4 py-3
                            focus-visible:outline-2
                            focus-visible:ouline-offset-4
                            focus-visible:outline-border-strong'
								/>

								<button
									type='button'
									onClick={() => setShowPassword((visible) => !visible)}
									aria-label={showPassword ? 'Dölj lösenord' : 'Visa lösenord'}
									className='
                                    absolute inset-y-0 right-0
                                    flex w-12 items-center justify-center
                                    rounded-sm cursor-pointer
                                    focus-visible:outline-2
                                    focus-visible:outline-offset-2
                                    focus-visible:outline-border-strong'>
									{showPassword ? (
										<EyeOff aria-hidden='true' className='h-5 w-5' />
									) : (
										<Eye aria-hidden='true' className='h-5 w-5' />
									)}
								</button>
							</div>
						</div>

						<Button type='submit' className='mt-2 w-full'>
							Logga in
						</Button>

						<p className='mt-6 text-center text-sm text-text-secondary'>
							Behöver du hjälp? Kontakta dina arbetsledare.
						</p>
					</form>
				</div>
			</div>
		</section>
	);
}
