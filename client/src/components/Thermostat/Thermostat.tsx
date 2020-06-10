import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import styles from './Thermostat.module.scss';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Thermostat = (props) => {
	// using useEffect to fetch data every 2 seconds (with setInterval)
	useEffect(() => {
		const interval = setInterval(() => {
			props.onFetchTemperatureData();
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	// since we have only date fprmat function, I decided to write the function
	// myself instead of using a library like momentjs
	const formatLastUpdate = (timestamp: number): string => {
		const date = new Date(timestamp);
		// Hours part from the timestamp
		const hours = date.getHours();
		// Minutes part from the timestamp
		const minutes = '0' + date.getMinutes();
		// Seconds part from the timestamp
		const seconds = '0' + date.getSeconds();
		return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	};

	return (
		<div className={styles.thermostat} data-testid='thermostat'>
			<div className={styles.container}>
				<div>
					<span onClick={() => props.updateTemperature(props.currentSetpoint - 0.5)} className={styles.arrows}>
					<ArrowBackIosIcon />
				</span>
				</div>
				<div className={styles.labelsContainer}>
					<span className={styles.currentSetpoint} data-testid='current-setpoint'>
					  {props.currentSetpoint}°
					</span>
					<span className={styles.currentTemp} data-testid="current-temp">
					  {props.currentTemp}°
					</span>
					<span className={styles.timestampContainer}>
						Last update: <span className={styles.timestamp}>{formatLastUpdate(props.timestamp)}</span>
					</span>
				</div>
				<div>
					<span onClick={() => props.updateTemperature(props.currentSetpoint + 0.5)} className={styles.arrows}>
					<ArrowForwardIosIcon />
				</span>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentSetpoint: state.thermostat.currentSetpoint,
	currentTemp: state.thermostat.currentTemp,
	timestamp: state.thermostat.timestamp
});

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchTemperatureData: () => dispatch(actions.fetchTemperatureData()),
		updateTemperature: (newSetpoint) => dispatch(actions.updateTemperature(newSetpoint))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Thermostat);
