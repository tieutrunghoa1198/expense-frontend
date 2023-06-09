import { _axios } from './authentication';

export default class RecordService {
	async getAll(page = 0, size = 20) {
		const res = await _axios.get(`records?page=${page}&size=${size}`);
		return res.data;
	}
    
	async create(record) {
		const res = await _axios.post('records', {...record});
		return res.data;
	}
	
}