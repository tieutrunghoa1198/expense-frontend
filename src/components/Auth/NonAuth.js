import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
const NonAuth = () => {
	const rolesStr = localStorage.getItem('roles') || '';
	const location = useLocation();

	return (rolesStr.length > 0)
		? <Navigate to="/home" state={{ from: location }} replace />
		: <Outlet />;
}

export default NonAuth;
