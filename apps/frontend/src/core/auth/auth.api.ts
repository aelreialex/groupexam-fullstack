const API_URL = import.meta.env.VITE_API_URL ?? '';

type LoginCredentials = {
	username: string;
	password: string;
};

export async function login(credentials: LoginCredentials): Promise<void> {
	const response = await fetch(`${API_URL}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		throw new Error('Inloggningen misslyckades.');
	}
}
