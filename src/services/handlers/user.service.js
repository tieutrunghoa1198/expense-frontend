import {_axios} from '../../constants/api.const';
import {ROLES} from '../../constants/roles';

export default class UserService {
    route = '';
    constructor(route) {
    	this.route = route;
    }
    async getMe() {
    	const res = await _axios.get(`${this.route}/me`);
    	return res.data
    }

    async getRaw(){
        return "Nothing";
    }

    async getUserById(id) {
    	const res = await _axios.get(`${this.route}/${id}`)
    	return res.data;
    }

    async giveAdminRole(username) {
    	const res = await _axios.post(`${this.route}/giverole`, {role: ROLES.ADMIN, username})
    	return res.data;
    }

    async removeAdminRole(username) {
    	const res = await _axios.post(`${this.route}/removerole`, {role: ROLES.ADMIN, username})
    	return res.data;
    }

    async update(username, obj) {
    	const res = await  _axios.put(`${this.route}/${username}`, {...obj});
    	return res.data;
    }

    async getUsers() {
    	const res = await _axios.get(`${this.route}/all`);
    	return res.data
    }
    async delete(id){
    	await _axios.delete(`${this.route}/${id}`);
    };
}
