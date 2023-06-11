import RecordService from './record.service';
import CategoryService from './category.service';
import { _axios } from '../../constants/api.const';
import { API_ROUTES } from '../../constants/api-urls';
import UserService from './user.service';

export class ApiService {
    Records = new RecordService(API_ROUTES.RECORDS);
    Categories = new CategoryService(API_ROUTES.CATEGORIES);
	User = new UserService(API_ROUTES.USERS);
	constructor() {
    	_axios.interceptors.request.use((config) => {
    		const token = localStorage.getItem('token');
    		if (token) {
    			config.headers.Authorization = token ? `Bearer ${token}` : undefined
    		}
    		return config
    	})
	}
}




