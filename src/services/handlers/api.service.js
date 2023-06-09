import RecordService from './record.service';
import CategoryService from './category.service';
import { _axios } from '../../constants/api.const';
import { API_ROUTES } from '../../constants/api-urls';

export class ApiService {
    Records = new RecordService(API_ROUTES.RECORDS);
    Categories = new CategoryService(API_ROUTES.CATEGORIES);

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




