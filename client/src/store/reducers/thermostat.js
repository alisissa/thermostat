import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  currentSetpoint: 0,
  currentTemp: 0,
  timestamp: null,
  loading: false
};

// P.S. I am not using the loading state here, I just wanted to show how I usually implement the redux store logic
const fetchTemperatureDataStart = (state) => {
  return updateObject(state, { loading: true });
};

const fetchTemperatureDataSuccess = (state, action) => {
  return updateObject(state, {
    currentSetpoint: action.temperatureData.currentSetpoint,
    currentTemp: action.temperatureData.currentTemp,
    timestamp: action.temperatureData.timestamp,
    loading: false
  });
};

const updateCurrentSetpoint = (state, action) => {
  return updateObject(state, { currentSetpoint: action.newSetpoint });
};

const fetchTemperatureDataFail = (state) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TEMPERATURE_DATA_START: return fetchTemperatureDataStart(state);
    case actionTypes.FETCH_TEMPERATURE_DATA_SUCCESS: return fetchTemperatureDataSuccess(state, action);
    case actionTypes.FETCH_TEMPERATURE_DATA_FAIL: return fetchTemperatureDataFail(state);
    case actionTypes.UPDATE_CURRENT_SETPOINT: return updateCurrentSetpoint(state, action);
    default: return state;
  }
};

export default reducer;
