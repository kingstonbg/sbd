import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from './countdown.module.scss';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
	isPlaying: true,
	size: 120,
	strokeWidth: 6,
};

const renderTime = (dimension, time) => {
	return (
		<div className={styles.timeWrapper}>
			<div className={styles.time}>{time}</div>
			<div>{dimension}</div>
		</div>
	);
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function Countdown() {
	const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
	const endTime = new Date('29 November 2022 24:00:00').getTime() / 1000; // use UNIX timestamp in seconds

	const remainingTime = endTime - startTime;
	const days = Math.ceil(remainingTime / daySeconds);
	const daysDuration = days * daySeconds;

	return (
		<div className={styles.countdown}>
			<h6 className="text-center">Dragonflight Release Countdown</h6>
			<div className={styles.counterWrapper}>
				<div className={styles.counter}>
					<CountdownCircleTimer
						{...timerProps}
						colors="#33937f"
						trailColor="#e0e1ddff"
						duration={daysDuration}
						initialRemainingTime={remainingTime}
					>
						{({ elapsedTime, color }) => (
							<span style={{ color }}>
								{renderTime(
									'days',
									getTimeDays(daysDuration - elapsedTime),
								)}
							</span>
						)}
					</CountdownCircleTimer>
				</div>
				<div className={styles.counter}>
					<CountdownCircleTimer
						{...timerProps}
						colors="#aad372"
						trailColor="#e0e1ddff"
						duration={daySeconds}
						initialRemainingTime={remainingTime % daySeconds}
						onComplete={(totalElapsedTime) => ({
							shouldRepeat:
								remainingTime - totalElapsedTime > hourSeconds,
						})}
					>
						{({ elapsedTime, color }) => (
							<span style={{ color }}>
								{renderTime(
									'hours',
									getTimeHours(daySeconds - elapsedTime),
								)}
							</span>
						)}
					</CountdownCircleTimer>
				</div>
				<div className={styles.counter}>
					<CountdownCircleTimer
						{...timerProps}
						colors="#00ff98"
						trailColor="#e0e1ddff"
						duration={hourSeconds}
						initialRemainingTime={remainingTime % hourSeconds}
						onComplete={(totalElapsedTime) => ({
							shouldRepeat:
								remainingTime - totalElapsedTime >
								minuteSeconds,
						})}
					>
						{({ elapsedTime, color }) => (
							<span style={{ color }}>
								{renderTime(
									'minutes',
									getTimeMinutes(hourSeconds - elapsedTime),
								)}
							</span>
						)}
					</CountdownCircleTimer>
				</div>
				<div className={styles.counter}>
					<CountdownCircleTimer
						{...timerProps}
						colors="#fff468"
						trailColor="#e0e1ddff"
						duration={minuteSeconds}
						initialRemainingTime={remainingTime % minuteSeconds}
						onComplete={(totalElapsedTime) => ({
							shouldRepeat: remainingTime - totalElapsedTime > 0,
						})}
					>
						{({ elapsedTime, color }) => (
							<span style={{ color }}>
								{renderTime(
									'seconds',
									getTimeSeconds(elapsedTime),
								)}
							</span>
						)}
					</CountdownCircleTimer>
				</div>
			</div>
		</div>
	);
}
