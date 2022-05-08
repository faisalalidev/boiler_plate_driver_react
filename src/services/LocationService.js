import {
  LOCATION_TIME_OUT,
  LOCATION_MAX_AGE,
  LOCATION_HIGH_ACCURACY,
  TRACKER_LOCATION_TIME_OUT,
  TRACKER_LOCATION_MAX_AGE,
  TRACKER_LOCATION_DISTANCE_FILTER,
  TRACKER_LOCATION_HIGH_ACCURACY,
} from '../constants';

import Utils from '../util';
import {
  BASE_URL_SOCKET,
  API_DRIVER_UPDATE_LOCATION_BACKGROUND,
  APPLICATION_TOKEN,
} from '../config/WebService';

import {userLocationBackgroundRequest} from '../actions/UserLocation';
import {create} from 'apisauce';

import Geolocation from '@react-native-community/geolocation';

let count = 0;
class LocationService {
  watchID = null;

  // get current location is for getting current location this function runs and terminates
  getCurrentLocation(success, failure, locator) {
    Geolocation.getCurrentPosition(
      //
      // first argument for function returning current position
      //
      position => {
        // it has position
        success(position);
      },
      //
      // second argument for handling error
      //
      error => {
        console.log('getCurrentLocation error : ', error);
        failure(error.message);
      },
      //
      // third argument is optional its for config timeout how long wait to return location maximumAge how much older data from cache is useless
      //
      {
        enableHighAccuracy: LOCATION_HIGH_ACCURACY,
        timeout: LOCATION_TIME_OUT,
        maximumAge: LOCATION_MAX_AGE,
      },
    );
  }

  // start location service is for tracking user location after every distanceFilter times distance covered

  startTrackingService(success, failure, locator, callback) {
    // callback
    this.watchID = Geolocation.watchPosition(
      position => {
        // set location and get location is only for --- rest is for all projects
        console.log('startTrackingServiceios working : ', position);
        console.log('startTrackingServiceios working counter  : ', count++);

        success(position);
        const payload = {
          socket_status: '0',
          user_status: 1,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          'user-token': Utils.getUserToken(),
        };

        const socketConectionStatus = Utils.getStoreRef().getState()
          .SocketConnetion.isSocketConnected;

        const networkInfoListner = Utils.getStoreRef().getState().networkInfo
          .isNetworkConnected;

        console.log('store ref networkInfoListner :', networkInfoListner);

        const userSocketStatus = Utils.getStoreRef().getState().user.data
          .socket_status;

        if (!socketConectionStatus && networkInfoListner) {
          const api = create({
            baseURL: BASE_URL_SOCKET,
            headers: {
              'user-token': Utils.getUserToken(),
              token: APPLICATION_TOKEN,
              'Content-Type': 'application/json',
            },
          });

          api
            .post(API_DRIVER_UPDATE_LOCATION_BACKGROUND, payload)
            .then(response => {
              console.log(' response aya  class ', response);
            })
            .catch(error => {
              console.log('error aya  : ', error);
            });
        } // socket

        callback(position);
      },
      //
      // second argument for handling error
      //
      error => {
        failure(error.message);
      },

      {
        enableHighAccuracy: TRACKER_LOCATION_HIGH_ACCURACY,
        timeout: TRACKER_LOCATION_TIME_OUT,
        maximumAge: TRACKER_LOCATION_MAX_AGE,
        distanceFilter: TRACKER_LOCATION_DISTANCE_FILTER,
        // useSignificantChanges: to do when significant change occur
      },
    );
  }

  getWatchID() {
    return this.watchID;
  }
  clearWatchId() {
    Geolocation.clearWatch(this.watchID);
  }
}

export default new LocationService();
