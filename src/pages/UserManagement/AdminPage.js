import React, {useEffect, useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import {Link,useParams } from 'react-router-dom';
const AdminPage = () => {
	const [users, setUsers] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		getAllUser()
	}, [])

	const getAllUser = async () => {
		const res = await API_SERVICE.User.getUsers()
		console.log(res)
		setUsers(res);
	}

	const deleteUser = async (id) => {
		try {
			await API_SERVICE.User.deleteUser(id)
			await getAllUser()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className="container">
			<h1>User Manager</h1>
			<button className="btn btn-primary">
				<Link to="/create-user" style={{ color: 'white', textDecoration: 'none'}}>
					Create User
				</Link>
			</button>
			{
				users
					? (<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Username</th>
								<th scope="col">Fullname</th>
								<th scope="col">Email</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => {
								return (
									<tr key={index}>
										<th user="row">{index + 1}</th>
										<td>{user.username}</td>
										<td>{user.fullname}</td>
										<td>{user.email}</td>
										<td>
											<Link to={`/users/${user.id}`} style={{ textDecoration: 'none'}}>
												<button className="btn btn-outline-primary mx-1">
													Edit
												</button>	
											</Link>
											<button className="btn btn-outline-danger mx-1"
												onClick={() => deleteUser(user.username)}>Delete</button>
										</td>
									</tr>
								)
							})
							}
						</tbody>
					</table>)
					: (<p> There is no data for displaying! </p>)
			}
		</div>
	);
};

export default AdminPage;
