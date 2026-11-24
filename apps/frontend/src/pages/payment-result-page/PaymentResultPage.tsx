import { Check, X } from 'lucide-react';
import { Section } from '@app/section';
import { Pamphlet } from '@app/pamphlet';

type PaymentResultPageProps = {
	status: 'success' | 'cancel';
};

export function PaymentResultPage({ status }: PaymentResultPageProps) {
	const isSuccess = status === 'success';
	const StatusIcon = isSuccess ? Check : X;

	return (
		<Section>
			<div className='flex min-h-[65vh] items-center justify-center py-6'>
				<div className='relative w-full max-w-lg'>
					<div
						className={`absolute left-1/2 top-0 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-border-strong shadow-[3px_3px_0_var(--color-border-strong)]
						${
							isSuccess
								? 'bg-interactive-primary text-text-primary'
								: 'bg-bg-surface text-brand-primary'
						}`}>
						<StatusIcon size={26} strokeWidth={3} aria-hidden='true' />
					</div>

					<Pamphlet variant='result'>
						<div className='space-y-4 pt-2 text-center'>
							<div className='space-y-2 font-alfa-slab-one text-brand-primary'>
								<p>{isSuccess ? 'Beställningen är klar' : 'Ingen fara'}</p>

								<h1 className='text-3xl leading-tight sm:text-4xl'>
									{isSuccess ? (
										<>
											Tack för din
											<br />
											beställning!
										</>
									) : (
										<>
											Betalningen
											<br />
											avbröts
										</>
									)}
								</h1>
							</div>

							<p className='text-sm'>
								{isSuccess
									? 'Betalningen har genomförts och din beställning är bekräftad.'
									: 'Beställningen har inte slutförts och du har inte blivit debiterad.'}
							</p>
						</div>
					</Pamphlet>
				</div>
			</div>
		</Section>
	);
}
