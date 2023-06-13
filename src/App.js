import React, { Component}  from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/ExpenseManagement/HomePage';
import Layout from './components/Layout';
import LoginPage from './pages/Auth/LoginPage';
import MissingPage from './pages/MissingPage';
import RegisterPage from './pages/Auth/RegisterPage';
import RequireAuth from './components/Auth/RequireAuth';
import { ROLES } from './constants/roles';
import AdminPage from './pages/UserManagement/AdminPage';
import RecordPage from './pages/ExpenseManagement/RecordPage';
import CategoryPage from './pages/ExpenseManagement/CategoryPage';
import { Provider } from 'react-redux';
import LoginStore from './state/login/store';
import NonAuth from './components/Auth/NonAuth';
import UserProfilePage from './pages/UserManagement/UserProfilePage';
import CreateRecordPage from './pages/ExpenseManagement/CreateRecordPage';
import DetailRecordPage from './pages/ExpenseManagement/DetailRecordPage';
import UpdateRecordPage from './pages/ExpenseManagement/UpdateRecordPage';
class App extends Component {
	render(){
		return(
			<Provider store={LoginStore}>
				<Routes>
					<Route path='/' element={<Layout />}>
						{/* public routes */}
						<Route element={<NonAuth />}>
							<Route path='login' element={<LoginPage/>}/>
							<Route path='register' element={<RegisterPage/>}/>
						</Route>


						{/* protected routes for normal users */}
						<Route element={<RequireAuth allowedRoles={[ROLES.USER]}/>}>
							<Route path='home' element={<HomePage/>}/>
							<Route path='records' element={<RecordPage/>}/>
							<Route path='records/edit/:id' element={<UpdateRecordPage/>}/>
							<Route path='records/:id' element={<DetailRecordPage/>}/>
							<Route path='records/create' element={<CreateRecordPage/>}/>
							<Route path='categories' element={<CategoryPage/>}/>					
							<Route path='profile' element={<UserProfilePage/>}/>
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
