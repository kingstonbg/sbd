import styles from './navbar.module.scss';
import Menu from '../menu/index';
import { useEffect, useState } from 'react';

export default function Navbar() {
	const [tag, setTag] = useState('');

	useEffect(() => {
		const tag = sessionStorage.getItem('tag');
		if (tag) setTag(tag);
	});

	function getLoginInfo() {
		if (tag) return <p>{tag}</p>;
		return <a href="/api/oauth/battlenet">login</a>;
	}

	return (
		<nav className={styles.nav}>
			<Menu />
			{getLoginInfo()}
		</nav>
	);
}
