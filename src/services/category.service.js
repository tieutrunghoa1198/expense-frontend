import { _axios } from './authentication';

export default class CategoryService {
	async getAll(page = 0, size = 20) {
		const res = await _axios.get(`categories?page=${page}&size=${size}`);
		return res.data;
	}

	async create(category) {
		const res = await _axios.post('categories', {...category});
		return res.data;
	}
}