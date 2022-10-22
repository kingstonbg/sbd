import { useEffect } from 'react';
import { useRouter } from 'next/router';
import http from '../../services/http.service';

function Login() {
	const router = useRouter();

	useEffect(async () => {
		if (router.query.token) {
			sessionStorage.setItem('token', router.query.token);
			const user = await http.get('user');
			sessionStorage.setItem('tag', user.data.battletag);
		}
		router.replace('/');
	});

	return <div>Redirecting...</div>;
}

export default Login;
