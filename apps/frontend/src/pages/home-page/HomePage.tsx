//import { Button } from '@app/button';
//import { ShoppingBag } from 'lucide-react';

type ExampleComponentProps = {
	// Add props here
};

export function HomePage({}: ExampleComponentProps) {
	return <div className='mb-6 flex-col gap-4'></div>;
}

/*
			<Button variant='primary' aria-label='Varukorg, 4 varor'>
				<ShoppingBag size={20} aria-hidden='true' />
				<span>4</span>
			</Button>
			<Button className='w-full'>
				Wow va häftigt! Skicka den här häftiga beställningen till Nisses kök så
				han får grilla korven åt mig
			</Button>
			<Button variant='secondary'>Se hela menyn</Button>
			<Button disabled>Inaktiverad</Button>
			*/
