import axios from 'axios';

const http = axios.create({
	baseURL: `/api`,
	headers: {
		'Content-Type': 'application/json',
	},
});

http.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem('token');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			delete API.defaults.headers.common.Authorization;
		}
		return config;
	},

	(error) => Promise.reject(error),
);

export default http;
