export const BASE_URL = 'https://360cubes.com/ryder_staging/public/'; // developer
// export const BASE_URL = 'http://3.14.28.243/admin/public/'; // live
// export const BASE_URL = 'http://3.14.28.243/admin_panel/public/'; // live after backend correct

export const API_USER_NAME = '';
export const API_PASSWORD = '';
export const API_TIMEOUT = 30000;

export const API = '/api/';
export const APPLICATION_TOKEN = 'api.Pd*!(5675';

// API USER ROUTES
export const API_LOGIN = `${API}driver/login`;
export const API_STATE = `${API}state`;
export const API_CITY = `${API}city`;
export const API_SIGNUP_DRIVER = `${API}driver/create`;
export const API_FORGOT_PASSWORD = `${API}driver/forgot/password`;
export const API_DRIVER_PROFILE = `${API}driver/detail`;
export const API_DRIVER_PROFILE_UPDATE = `${API}driver/update`;
export const API_DRIVER_CHANGE_PASSWORD = `${API}driver/change/password`;

// export const FAQ = `${BASE_URL}api/driver/helps`;
export const FAQ = `${BASE_URL}getContents?id=10`;
export const PRIVACY_POLICY = `${BASE_URL}getContents?id=9`;
export const TERM_CONDITION = `${BASE_URL}getContents?id=8`;
export const HELP = `${BASE_URL}getContents?id=3`;
export const ABOUT_US = `${BASE_URL}getContents?id=5`;

export const MY_TRIPS = `${BASE_URL}api/driver/trips`;
export const MY_EARNINGS = `${BASE_URL}api/driver/earnings`;
export const NOTIFICATION = `${BASE_URL}api/notification/list`;
export const TRIP_DETAILS = `${BASE_URL}api/driver/tripDetail`;
export const API_UPLOAD_COMPLETE_RIDE_IMAGE = `${BASE_URL}api/image/upload_base64`;
export const API_DRIVER_UPDATE_LOCATION_BACKGROUND = `${API}updatelocation`; // socket https url

// SOCKET API *******
export const SOCKET_URL = 'http://192.34.60.217'; // developer
// export const SOCKET_URL = 'http://3.14.28.243'; // live ;
export const SOCKET_PORT = '8007';

export const BASE_URL_SOCKET = `${SOCKET_URL}:${SOCKET_PORT}`;
export const API_DRIVER_SOKECT_LOGIN = 'login';

export const API_UPDATE_USER_LOCATION_DRIVER = 'UpdateUserLocation';

export const API_UPDATE_DRIVER_STATUS = 'UpdateDriverStatus';
export const API_DRIVER_REJECT_DRIVE = 'DriverRejectDrive';
export const API_DRIVER_ACCEPT_DRIVE = 'DriverAcceptDrive';
export const API_GET_DRIVE = 'getDrive';
export const API_START_RIDE = 'StartRide';
export const API_DRIVER_CANCEL_RIDE = 'DriverCancelRide';
export const API_PASSENGER_CANCEL_RIDE = 'PassengerRejectDrive';
export const API_DRIVER_COMPLETE_RIDE = 'CompleteRide';
export const API_DRIVER_LOGOUT = 'Logout';
export const API_APP_STATUS = 'app_status';
export const API_TODAY_DRIVER_EARNING = 'TodayDriverEarnings';

//Google API Requests
export const GOOGLE_MAP_BASE_URL = 'https://maps.googleapis.com/maps/api/';
export const API_AUTOCOMPLETE = 'place/autocomplete/json';
export const API_GEOCODE = 'geocode/json';
export const API_NEARBY = 'place/nearbysearch/json';
export const API_DIRECTION = 'directions/json';
export const API_DISTANCEMATRIX = 'distancematrix/json';

// ******** APP STATUS FROM SOCKET
export const DRIVER_RIDE_GET_DRIVE = 'driver_ride_getDrive';
export const PASSENGER_RIDE_REJECTED = 'passenger_ride_rejected';
export const home_page = 'home_page';
export const ride_accepted = 'ride_accepted';
export const request_ride = 'request_ride';
export const on_ride = 'on_ride';
export const complete_ride = 'complete_ride';
export const cancel_ride_by_driver = 'cancel_ride_by_driver';
export const cancel_ride_by_passenger = 'cancel_ride_by_passenger';
export const add_rate = 'add_rate';

export const rider_arrived = 'rider_arrived';

export const API_LOG = false;

export const ERROR_REQUEST_TIMEOUT = {
  error: 1,
  title: 'Request taking too much time',
  message:
    'We are sorry. It seems like something went wrong with your Internet connection',
};
export const ERROR_SERVER_CONNECTION = {
  error: 1,
  title: 'Connection Error',
  message: 'Server not available, bad dns.',
};
export const ERROR_REQUEST_CANCEL = {
  error: 1,
  title: 'Request Canceled',
  message: 'You have canceled request.',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  error: 1,
  title: 'Network not available',
  message: 'Make sure wi-fi or celluar data is turned on',
};
export const ERROR_SOMETHING_WENT_WRONG = {
  error: 1,
  title: 'Whoops',
  message: 'Looks like something went wrong.',
};
export const ERROR_CLIENT = {
  error: 1,
  title: 'Whoops',
  message: 'Looks like we did something went wrong.',
};
