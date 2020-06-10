import * as actionTypes from './actionTypes';
import axios from 'axios';

// main api url
const URL = 'http://localhost:9090/';

// I am using this flag to determine ii the temp is being updated,
// if it is I skip refreshing data so that UI isn't interrupted
let isBeingUpdated = false;

export const fetchTemperatureDataFail = (error) => {
  return {
    type: actionTypes.FETCH_TEMPERATURE_DATA_FAIL,
    error: error
  };
};

export const fetchTemperatureDataStart = () => {
  return {
    type: actionTypes.FETCH_TEMPERATURE_DATA_START
  };
};

export const fetchTemperatureDataSuccess = (temperatureData) => {
  return {
    type: actionTypes.FETCH_TEMPERATURE_DATA_SUCCESS,
    temperatureData: temperatureData
  };
};

export const updateCurrentSetpoint = (newSetpoint) => {
  return {
    type: actionTypes.UPDATE_CURRENT_SETPOINT,
    newSetpoint: newSetpoint
  };
};


// using axios CancelToken to adhere to one update at a time,
// if a new request is triggered, cancel tbe old one
let call;
const once = (config = {}) => {
  if (call) {
    call.cancel("Only one request allowed at a time.");
  }
  call = axios.CancelToken.source();

  config.cancelToken = call.token;
  return axios(config);
};

export const updateTemperature = (newSetpoint) => {
  isBeingUpdated = true;
  const config = {
    method: "patch",
    url: URL,
    data: {currentSetpoint: newSetpoint}
  };

  return dispatch => {
    dispatch(updateCurrentSetpoint(newSetpoint));
    once(config).then(res => {
        isBeingUpdated = false;
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log("post Request canceled");
        }
        dispatch(fetchTemperatureDataFail(err));
      });
  };
};

export const fetchTemperatureData = () => {
    return dispatch => {
      if (!isBeingUpdated) {
        dispatch(fetchTemperatureDataStart());
        axios.get(URL)
          .then(res => {
            // if res.status isn't 202, update state, otherwise call action again
            if (res.status !== 202) {
              dispatch(fetchTemperatureDataSuccess(res.data));
            } else {
              dispatch(fetchTemperatureData());
            }
          })
          .catch(err => {
            dispatch(fetchTemperatureDataFail(err));
          });
      }
    };
};
