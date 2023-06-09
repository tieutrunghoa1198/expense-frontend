import React, {useState} from 'react';
import Authentication from '../services/handlers/auth.service';
import useAuth from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom';
import {LoginAction} from '../state/login/actions';
import {connect} from 'react-redux';

const LoginForm = ({ LoginAction }) => {
	const { setAuth } = useAuth()
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate()
	const handleLogin = async (event) => {
		event.preventDefault();
		setError('');
		try {
			const api = new Authentication();
			const res = await api.login(email, password);

			localStorage.setItem('token', res.token);
			localStorage.setItem('roles', JSON.stringify(res.roles));
			LoginAction()
			setAuth({...res});
			setEmail('');
			setPassword('');
			navigate('/home');
		} catch (error) {
			setError('Invalid email or password.');
		}
	};

	return (
		<div>
			<h2>Login Page</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email:</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			{error && <div>{error}</div>}
		</div>
	);
};

const mapDispatchToProps = {
	LoginAction
};

export default connect(null, mapDispatchToProps)(LoginForm);
