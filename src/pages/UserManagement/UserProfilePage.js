import React, {useEffect, useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';

const UserProfilePage = () => {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		getUserProfile()
	}, [])

	const getUserProfile = async () => {
		try {
			const res = await API_SERVICE.User.getMe()
			setProfile(res);
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className="container">
			<h1>User Profile</h1>
			{
				profile
					? (<div>
						<span className="fw-bold">Username</span>: {profile.username}
						<br/>
						<span className="fw-bold">Fullname</span>: {profile.fullname}
						<br/>
						<span className="fw-bold">Email</span>: {profile.email}
						<br/>
					  </div>)
					: (<div>
						<p>Loading data...</p>
					  </div>)
			}
		</div>
	);
};

export default UserProfilePage;
