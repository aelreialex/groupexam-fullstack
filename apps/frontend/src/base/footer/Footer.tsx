import { Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import logo from '../../assets/images/Logo.svg';

export function Footer() {
	return (
		<footer
			className={`
        w-full border-t border-border-strong
        bg-bg-footer text-text-on-dark
      `}>
			<div
				className={`
          mx-auto flex max-w-6xl flex-col justify-between gap-6
          p-4 sm:flex-row sm:items-center
        `}>
				<img src={logo} alt='Nisses Korvmoj' className='w-32' />

				<p className='font-kalam text-sm italic'>
					“Stäng dörren efter dig. Det finns ingen dörr, men ändå.”
				</p>

				<div
					className={`
            relative flex items-center gap-2 text-xs font-semibold
          `}>
					<p>STORATORGET</p>

					<span
						aria-hidden='true'
						className='h-1 w-1 shrink-0 rounded-full bg-text-on-dark'
					/>
					<p>SEDAN ALLTID</p>

					<Link
						to='/staff'
						aria-label='Personalinloggning'
						className='
            inline-flex h-5 w-5 shrink-0 items-center justify-center
            text-bg-footer
            hover:text-text-on-dark/70
            focus-visible:text-text-on-dark/70
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-text-on-dark
            '>
						<KeyRound aria-hidden='true' className='h-3 w-3' />
					</Link>
				</div>
			</div>
		</footer>
	);
}
