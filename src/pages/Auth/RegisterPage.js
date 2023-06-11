import React, { Component } from 'react';
import RegisterForm from '../../containers/RegisterForm';

export default class RegisterPage extends Component {
	render() {
		return (
			<div className='container'>
				<h1>Register Page</h1>
				<RegisterForm/>
			</div>
		)
	}
}
