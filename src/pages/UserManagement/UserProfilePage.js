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
			console.log(res)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className="container">
			{
				profile
					? (<div>
						Username: {profile.username}
						<br/>
						Fullname: {profile.fullname}
						<br/>
						Email: {profile.email}
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
