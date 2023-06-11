import React, { useState } from 'react';
import Authentication from '../services/handlers/auth.service';

const RegisterForm = () => {
	const [username, setUsername] = useState('');
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const handleRegister = async (e) => {
		e.preventDefault();
		setError('');

		// Perform registration logic here, such as making an API request
		try {
			const api = new Authentication();
			await api.register(username, fullname, email, password);
			setError('Create account successfully!')

			// Reset the form
			setUsername('');
			setFullname('');
			setEmail('');
			setPassword('');
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<form onSubmit={handleRegister}>
			<div>
				<label>Username:</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label>Full Name:</label>
				<input
					type="text"
					value={fullname}
					onChange={(e) => setFullname(e.target.value)}
				/>
			</div>
			<div>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit">Register</button>
			{error && <div>{error}</div>}
		</form>
	);
};

export default RegisterForm;
