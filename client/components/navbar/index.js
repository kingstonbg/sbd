import styles from './navbar.module.scss';
import Menu from '../menu/index';
import axios from 'axios';

export default function Navbar() {
	async function login() {
		await axios.get('/api/oauth/battlenet', {
			'Content-Type': 'text/plain',
		});
	}

	return (
		<nav className={styles.nav}>
			<Menu />
			{/* <button onClick={login}>login</button> */}
			<a href="/api/oauth/battlenet">login</a>
		</nav>
	);
}
