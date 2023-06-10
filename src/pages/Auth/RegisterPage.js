import React, { Component } from 'react';

export default class RegisterPage extends Component {
	render() {
		return (
			<div className='container'>
				<h1>Register</h1>
                username: <input type='text' name='username'/>
				<br/>
                password: <input type='password' name='username'/>
				<br/>
				<button>Login</button>
			</div>
		)
	}
}