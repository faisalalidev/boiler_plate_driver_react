// @flow

const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const LOGOUT = "LOGOUT";
export const NETWORK_INFO = "NETWORK_INFO";

export const USER_LOCATION = createRequestTypes("USER_LOCATION");
export const USER_LOCATION_BACKGROUND = createRequestTypes(
  "USER_LOCATION_BACKGROUND"
);
export const TRACKING_LOCATION = "TRACKING_LOCATION";

export const LOGIN = createRequestTypes("LOGIN");
export const STATE = createRequestTypes("STATE");
export const SIGN_UP = createRequestTypes("SIGN_UP");
export const CITY = createRequestTypes("CITY");
export const FAQ = createRequestTypes("FAQ");
export const FORGOT_PASSWORD = createRequestTypes("FORGOT_PASSWORD");
export const DRIVER_PROFILE = createRequestTypes("DRIVER_PROFILE");
export const DRIVER_PROFILE_UPDATE = createRequestTypes(
  "DRIVER_PROFILE_UPDATE"
);
export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");

export const NOTIFICATION = createRequestTypes("NOTIFICATION");
export const TODAY_DRIVER_EARNING = createRequestTypes("TODAY_DRIVER_EARNING");
export const MY_EARNINGS = createRequestTypes("MY_EARNINGS");
export const MY_TRIPS = createRequestTypes("MY_TRIPS");
export const TRIP_DETAILS = createRequestTypes("TRIP_DETAILS");
export const TRIP_BY_DATE = createRequestTypes("TRIP_BY_DATE");

export const EMPTY = createRequestTypes("EMPTY");

export const UPLOAD_COMPLETE_RIDE_IMAGE = createRequestTypes(
  "UPLOAD_COMPLETE_RIDE_IMAGE"
);

// SOCKET ACTIONS
export const SOCKET_INFO = "SOCKET_INFO";
export const SOCKET_CONNECT = createRequestTypes("SOCKET_CONNECT");
export const APP_STATUS = createRequestTypes("APP_STATUS");

export const DRIVER_UPDATE_LOCATION = createRequestTypes(
  "DRIVER_UPDATE_LOCATION"
);
export const DRIVER_ONLINE_STATUS = createRequestTypes("DRIVER_ONLINE_STATUS");
export const GET_DRIVE = createRequestTypes("GET_DRIVE");
export const DRIVE_STATUS = "DRIVE_STATUS";
export const DRIVE_TIMER = "DRIVE_TIMER";
export const RESET_GET_DRIVE = "RESET_GET_DRIVE";

export const DRIVER_ACCEPT_RIDE = createRequestTypes("DRIVER_ACCEPT_RIDE");
export const DRIVER_RIDE_STATUS = "DRIVER_RIDE_STATUS";

export const DRIVER_REJECT_RIDE = createRequestTypes("DRIVER_REJECT_RIDE");
export const DRIVER_REJECT_RIDE_STATUS = "DRIVER_REJECT_RIDE_STATUS";
export const DRIVER_RIDE_REDUCER_RESET = "DRIVER_RIDE_REDUCER_RESET";

export const PASSENGER_CANCEL_RIDE = createRequestTypes(
  "PASSENGER_CANCEL_RIDE"
);
export const PASSENGER_CANCEL_RIDE_STATUS = "PASSENGER_CANCEL_RIDE_STATUS";
export const RESET_PASSENGER_CANCEL_RIDE = "RESET_PASSENGER_CANCEL_RIDE";

export const SHORTEST_PATH = createRequestTypes("SHORTEST_PATH");
export const SHORTEST_PATH_INITIAL_STATE = "SHORTEST_PATH_INITIAL_STATE";
export const DISTANCE_MATRIX = createRequestTypes("DISTANCE_MATRIX");

export const DRIVER_START_RIDE = createRequestTypes("DRIVER_START_RIDE");
export const RESET_DRIVER_START_RIDE = "RESET_DRIVER_START_RIDE";

export const DRIVER_CANCEL_RIDE = createRequestTypes("DRIVER_CANCEL_RIDE");
export const DRIVER_COMPLETE_RIDE = createRequestTypes("DRIVER_COMPLETE_RIDE");

export const DRIVER_LOGOUT = createRequestTypes("DRIVER_LOGOUT");
