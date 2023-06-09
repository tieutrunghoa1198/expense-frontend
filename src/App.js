import React, { Component}  from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import MissingPage from './pages/MissingPage';
import RegisterPage from './pages/RegisterPage';
import RequireAuth from './components/RequireAuth';
import { ROLES } from './constants/roles';
import AdminPage from './pages/AdminPage';
import RecordPage from './pages/RecordPage';
import CategoryPage from './pages/CategoryPage';
import { Provider } from 'react-redux';
import LoginStore from './state/login/store';
class App extends Component {
	render(){
		// const tokenStr = localStorage.getItem('token') || '';
		// const token = tokenStr.length > 0;
		return(
			<Provider store={LoginStore}>
				<Routes>
					<Route path='/' element={<Layout />}>
						{/* public routes */}
						<Route path='login' element={<LoginPage/>}/>
						<Route path='register' element={<RegisterPage/>}/>

						{/* protected routes for normal users */}
						<Route element={<RequireAuth allowedRoles={[ROLES.USER]}/>}>
							<Route path='home' element={<HomePage/>}/>
							<Route path='records' element={<RecordPage/>}/>
							<Route path='categories' element={<CategoryPage/>}/>
						</Route>

						{/* protected routes for ADMIN */}
						<Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]}/>}>
							<Route path='admin-dashboard' element={<AdminPage/>}/>
						</Route>

						{/* catch all */}
						<Route path='*' element={<MissingPage/>}/>
					</Route>
				</Routes>
			</Provider>

		);
	}
}

export default App;
