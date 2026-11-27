export function StaffHeading() {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 120'>
			<defs>
				<path id='staff-heading-curve' d='M 15 85 Q 250 35 485 85' />
			</defs>

			<text fill='#382b22' className='font-kalam text-[40px]'>
				<textPath
					href='#staff-heading-curve'
					startOffset='50%'
					textAnchor='middle'>
					Dags att rulla igång!
				</textPath>
			</text>

			<path
				d='M 130 105 Q 250 80 370 100'
				fill='none'
				stroke='#a72c26'
				strokeWidth='5'
				strokeLinecap='round'
			/>
		</svg>
	);
}
