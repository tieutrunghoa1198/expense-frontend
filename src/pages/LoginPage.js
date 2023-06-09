import React, { Component } from 'react';

export default class LoginPage extends Component {
	constructor(props) {
		super(props)
		this.state = false
	}

	render() {
		return (
			<div className='container'>
				<h1>Login</h1>
                username: <input type='text' name='username'/>
				<br/>
                password: <input type='password' name='username'/>
				<br/>
				<button>Login</button>
			</div>
		)
	}
}