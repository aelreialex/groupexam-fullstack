import { Section } from '@app/section';

type PaymentResultPageProps = {
	status: 'success' | 'cancel';
};

export function PaymentResultPage({ status }: PaymentResultPageProps) {
	const isSuccess = status === 'success';

	return (
		<Section>
			<div className='mx-auto w-full max-w-lg text-center'>
				<p>{isSuccess ? 'Beställningen är klar' : 'Ingen fara'}</p>

				<h1>
					{isSuccess ? 'Tack för din beställning!' : 'Betalningen avbröts'}
				</h1>
			</div>
		</Section>
	);
}
