import styles from './menu.module.scss';
import { FaHome, FaUser } from 'react-icons/fa';
import { GiDungeonGate, GiBattleGear } from 'react-icons/gi';
import { useState } from 'react';

export default function Menu() {
	const [showMenu, setShowMenu] = useState(false);

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
					</div>
				</div>
			</div>
		</>
	);
}
