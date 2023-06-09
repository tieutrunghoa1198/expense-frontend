import axios from 'axios'
import RecordService from './record.service';
import CategoryService from './category.service';
const baseURL = 'http://localhost:8090/api/'
export const _axios = axios.create({ baseURL })

class ApiService {
    Records = new RecordService();
    Categories = new CategoryService();

    constructor() {
    	_axios.interceptors.request.use((config) => {
    		const token = JSON.parse(localStorage.getItem('user')).token;
    		if (token) {
    			config.headers.Authorization = token ? `Bearer ${token}` : undefined
    		}
    		return config
    	})
    }
}

export const API_SERVICE = new ApiService();


