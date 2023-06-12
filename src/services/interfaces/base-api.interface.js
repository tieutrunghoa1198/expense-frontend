import { _axios } from '../../constants/api.const';

export default class BaseApi {
     route = ''
     
     constructor(route) {
     	this.route = route
     }


     /**
     * @param {number} page
     * @param {number} size
     * 
     * @return {list}
     */
     async getAll(page = 0, size = 200) {
     	const res = await _axios.get(`${this.route}?page=${page}&size=${size}`);
     	return res.data
     }


     /**
     * @param {number} id
     * 
     * @return {object} one object
     */
     async getOne(id) {
     	const res = await _axios.get(`${this.route}/${id}`);
     	return res.data;
     }


     /**
     * @param {any} obj
     * 
     * @return {any} created obj
     */
     async create(obj) {
     	const res = await _axios.post(`${this.route}`, {...obj});
     	return res.data;
     }


     /**
      * @param {any} obj
      * @param {number} obj
      *
      * @return {any} updated obj
      */
     async update(id, obj) {
     	const res = await _axios.put(`${this.route}/${id}`, {...obj});
     	return res.data;
     }


     /**
     * @param {number} id
     * 
     * @return {any} deleted obj
     */
     async delete(id) {
     	const res = await _axios.delete(`${this.route}/${id}`);
     	return res.data;
     }
}
