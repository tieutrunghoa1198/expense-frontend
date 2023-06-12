import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import React from 'react';
import LoginStore from '../../state/login/store';
const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();
	const rolesStr = localStorage.getItem('roles');
	const roles = JSON.parse(rolesStr);
	const store = LoginStore.getState()

	if (store.isLoggedIn) return <Outlet />

	return roles && roles.find((role) => (allowedRoles && allowedRoles.includes(role)))
		? <Outlet />
		: (auth && auth.user) 
			? <Navigate to="/unauthorized" state={{ from: location }} replace /> 
			: <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
