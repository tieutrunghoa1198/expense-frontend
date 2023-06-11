import {_axios} from '../../constants/api.const';

export default class Authentication {
	async login(username, password) {
		const res = await _axios.post('auth/login', { username, password });
		return res.data;
	}

	async register(username, fullname, email, password) {
		const res = await _axios.post('auth/register', {
			username, fullname, email, password
		});
		return res.data;
	}
}
