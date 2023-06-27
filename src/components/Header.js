import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {getLoginStatus} from '../state/login/selectors';
import {ROLES} from '../constants/roles';
const Header = ({isLoggedIn}) => {
	const tokenStr = localStorage.getItem('token');
	const roles = localStorage.getItem('roles');
	const convertedRoles = JSON.parse(roles);
	const isAdmin = (roles) => {
		return roles.find((role) => (role === ROLES.ADMIN))
	}

	const handleLogout = () => {
		localStorage.clear();
		window.location.href = '/login';
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mx-3">
			<Link className="navbar-brand" to="/home">Home</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			{isLoggedIn || tokenStr
				? (<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/records">Expense Record</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link" to="/categories">Category</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link" to="/profile">Profile</Link>
						</li>

						{isAdmin(convertedRoles)
							? <li className="nav-item">
								<Link className="nav-link" to="/users">Manage User</Link>
							  </li>
							: <></>}
									<li className="nav-item">
							<Link className="nav-link" to="/fileupload">Develop Feature</Link>
						</li>

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
