import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import React from 'react';
const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();
	const rolesStr = localStorage.getItem('roles');
	const roles = JSON.parse(rolesStr);

	return roles && roles.find((role) => (allowedRoles && allowedRoles.includes(role)))
		? <Outlet /> 
		: (auth && auth.user) 
			? <Navigate to="/unauthorized" state={{ from: location }} replace /> 
			: <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
