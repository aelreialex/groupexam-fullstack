import { Button } from '@app/button';
import nisseProfile from '../../assets/images/nisse-profil.png';

type CartEmptyStateProps = {
	onGoToMenu: () => void;
};

export function CartEmptyState({ onGoToMenu }: CartEmptyStateProps) {
	return (
		<div className='flex flex-col items-center pt-10 text-center'>
			<img src={nisseProfile} alt='' className='w-40 -scale-x-100' />

			<p className='font-kalam text-xl'>
				Här var det tomt: Det går inte att äta luft.
			</p>

			<Button onClick={onGoToMenu} className='mt-3'>
				Gå till menyn
			</Button>
		</div>
	);
}
