import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {getLoginStatus} from '../state/login/selectors';
const Header = ({isLoggedIn}) => {
	console.log(isLoggedIn)
	const tokenStr = localStorage.getItem('token');
	const handleLogout = () => {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mx-3">
			<Link className="navbar-brand" to="/home">Home</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			{isLoggedIn
				? (<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">

						{/* logout */}
						<li className="nav-item">
							<button className="nav-link" onClick={handleLogout}>Logout</button>
						</li>
					</ul>
				</div>)
				: (<div className="collapse navbar-collapse" id="navbarNav">
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
				</div>)}
		</nav>
	)
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: getLoginStatus(state),
	};
};

export default connect(mapStateToProps)(Header);
