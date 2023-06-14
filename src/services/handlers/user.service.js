import {_axios} from '../../constants/api.const';

export default class UserService {
    route = '';
    constructor(route) {
    	this.route = route;
    }
    async getMe() {
    	const res = await _axios.get(`${this.route}/me`);
    	return res.data
    }
    async getUsers() {
    	const res = await _axios.get(`${this.route}/all`);
    	return res.data
    }
    async deleteUser(id){
    	await _axios.delete(`${this.route}/${id}`);   
    };
}
