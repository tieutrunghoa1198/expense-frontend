import React, { Component } from 'react';
import RegisterForm from '../../containers/RegisterForm';

export default class AddNewUser extends Component {
	render() {
		return (
			<div className='container'>
				<h1>Add New User</h1>
				<RegisterForm/>
			</div>
		)
	}
}
