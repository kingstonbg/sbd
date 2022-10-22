import styles from './menu.module.scss';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { GiDungeonGate, GiBattleGear } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Menu() {
	const [isLogged, setIsLogged] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		setIsLogged(!!token);
	});

	async function logout() {
		setShowMenu(false);
		sessionStorage.clear();
		router.asPath == '/' ? router.reload() : await router.push('/');
	}

	function onClick() {
		console.log('clicked');
	}

	function onOverlayClick(e) {
		if (!e.target.className.includes('hexagon')) {
			console.log('closed');
			setShowMenu(false);
		}
	}

	return (
		<>
			<div className={styles.menuToggle}>
				<input
					checked={showMenu}
					onChange={(e) => setShowMenu(!showMenu)}
					type="checkbox"
				/>
				<span></span>
				<span></span>
				<span></span>
				<div
					className={styles.overlay}
					onClick={(e) => onOverlayClick(e)}
				></div>
				<div className={styles.menu}>
					<div className={styles.hexWrapper}>
						<div className={styles.hexRow} onClick={onClick}>
							<div className={styles.hexagon}>
								<FaHome
									className={styles.menuIcon}
									style={{
										margin: 'auto',
										fontSize: '100px',
									}}
								/>
								<p className={styles.menuText}>Home</p>
								<div className={styles.face1}></div>
								<div className={styles.face2}></div>
							</div>
						</div>
						<div className={styles.hexRow} onClick={onClick}>
							<div className={styles.hexagon}>
								<FaUser
									className={styles.menuIcon}
									style={{
										margin: 'auto',
										fontSize: '100px',
									}}
								/>
								<p className={styles.menuText}>Profile</p>
								<div className={styles.face1}></div>
								<div className={styles.face2}></div>
							</div>
						</div>
						<div className={styles.hexRow} onClick={onClick}>
							<div className={styles.hexagon}>
								<GiDungeonGate
									className={styles.menuIcon}
									style={{
										margin: 'auto',
										fontSize: '100px',
									}}
								/>
								<p className={styles.menuText}>M+</p>
								<div className={styles.face1}></div>
								<div className={styles.face2}></div>
							</div>
						</div>
						<div className={styles.hexRow} onClick={onClick}>
							<div className={styles.hexagon}>
								<GiBattleGear
									className={styles.menuIcon}
									style={{
										margin: 'auto',
										fontSize: '100px',
									}}
								/>
								<p className={styles.menuText}>Raid</p>
								<div className={styles.face1}></div>
								<div className={styles.face2}></div>
							</div>
						</div>
						{isLogged ? (
							<div className={styles.hexRow} onClick={logout}>
								<div className={styles.hexagon}>
									<FaSignOutAlt
										className={styles.menuIcon}
										style={{
											margin: 'auto',
											fontSize: '100px',
										}}
									/>
									<p className={styles.menuText}>Logout</p>
									<div className={styles.face1}></div>
									<div className={styles.face2}></div>
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
