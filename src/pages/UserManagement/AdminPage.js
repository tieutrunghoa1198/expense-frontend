import React, {useEffect, useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import {Link} from 'react-router-dom';
const AdminPage = () => {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		getAllUser()
	}, [])

	const getAllUser = async () => {
		const res = await API_SERVICE.User.getUsers()
		setUsers(res.content);
	}

	const deleteUser = async () => {
		await API_SERVICE.User.deleteUser(id)		
	}

	return (
		<div className="container">
			<h1>User Manager</h1>
			<button className="btn btn-primary">
				<Link to="/create-user" style={{ color: 'white', textDecoration: 'none'}}>Create User <i class="fa fa-plus" aria-hidden="true"></i></Link>
			</button>
			
				
				<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Username</th>
								<th scope="col">Fullname</th>
								<th scope="col">Email</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						{users? (<tbody>
							{users.map((user, index) => {						
								return (
									<tr key={index}>
										<th user="row">{index + 1}</th>
										<td>{user.username}</td>							
										<td>{user.fullname}</td>	
										<td>{user.email}</td>				
										<td>
											<button className="btn btn-outline-primary mx-1">
												<Link to={`/users/${user.id}`} style={{ textDecoration: 'none'}}>
													Details
												</Link>
											</button>
											<button className="btn btn-outline-danger mx-1"  onClick={() => deleteUser(user.id)}>Delete</button>
										</td>
									</tr>
								)
							})
						}
						</tbody>): (<p> There is no data for displaying! </p>)	}
					</table>
					
		
		</div>
	);
};

export default AdminPage;
