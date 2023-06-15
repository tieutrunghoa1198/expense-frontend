import React, {useEffect, useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import {useNavigate, useParams} from 'react-router-dom';

const UserDetailForAdmin = () => {
	const { id } = useParams();
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		username: '',
		fullname: '',
		email: '',
		roles: []
	})
	const [selectedRoles, setSelectedRoles] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		getUserProfile()
	}, [])

	const getUserProfile = async () => {
		try {
			const res = await API_SERVICE.User.getUserById(id)
			const rolesId = [];
			if (res.roles.length === 0) return;
			res.roles.forEach(role => {
				rolesId.push(role.id)
			})
			setFormData(res);
			setSelectedRoles(rolesId)
		} catch (e) {
			console.log(e)
		}
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleUpdateUser = async (e) => {
		e.preventDefault()
		setError('')
		try {
			await API_SERVICE.User.update(formData.username, formData);
			await handleGiveAdminRole();
			navigate('/users');
		} catch (e) {
			console.log(e)
			setError(e.message)
		}
	}

	const handleCheckboxChange = (event, roleId) => {
		event.target.checked
			? setSelectedRoles([...selectedRoles, roleId])
			: setSelectedRoles(selectedRoles.filter(id => id !== roleId));
	};

	const handleGiveAdminRole = async () => {
		selectedRoles.includes(2)
			? await API_SERVICE.User.giveAdminRole(formData.username)
			: await API_SERVICE.User.removeAdminRole(formData.username);
	}

	return (
		<div className="container">
			<h1 className="text-capitalize">Update User Info</h1>
			{
				formData
					? (
						<form className="col-5" onSubmit={handleUpdateUser}>
							<div className="form-group mb-3">
								<label htmlFor="exampleInputEmail1">User Name</label>
								<input
									type="text"
									name="username"
									value={formData.username}
									onChange={handleChange}
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Name"/>
							</div>

							<div className="form-group mb-3">
								<label htmlFor="exampleInputPassword1">Full Name</label>
								<input
									type="text"
									name="fullname"
									value={formData.fullname}
									onChange={handleChange}
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Name"/>
							</div>

							<div className="form-group mb-3">
								<label htmlFor="exampleInputPassword1">Email</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Name"/>
							</div>

							<div className="mb-2">
								<input className="form-check-input me-2"
											  type="checkbox"
											  value=""
											  id="isAdmin"
											  onChange={(event) => handleCheckboxChange(event, 2)}
											  checked={selectedRoles.includes(2)}/>
								<label htmlFor="isAdmin" className="me-2" style={{userSelect: 'none'}}>Admin</label>
							</div>

							<button type="submit" className="btn btn-primary">Update</button>
							{error && <div>{error}</div>}
						</form>)
					: (<div>
						<p>Loading data...</p>
					</div>)
			}
		</div>
	);
};

export default UserDetailForAdmin;
