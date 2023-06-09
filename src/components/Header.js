import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light mx-3">
				<Link className="navbar-brand" to="/home">Home</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{/* login  */}
						<li className="nav-item">
							<Link className="nav-link" to="/login">Login</Link>
						</li>

						{/* register */}
						<li className="nav-item">
							<Link className="nav-link" to="/register">Register</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}