import axios from 'axios'
import { ApiService } from '../services/handlers/api.service';

// base URL 
export const baseURL = 'https://sh.io.vn/api/';

// base axios
export const _axios = axios.create({ baseURL: baseURL });

// global API service
export const API_SERVICE = new ApiService();