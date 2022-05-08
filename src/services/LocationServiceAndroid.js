import Geolocation from 'react-native-geolocation-service';

import {
  LOCATION_TIME_OUT,
  LOCATION_MAX_AGE,
  LOCATION_DISTANCE_FILTER,
  LOCATION_HIGH_ACCURACY,
  TRACKER_LOCATION_TIME_OUT,
  TRACKER_LOCATION_MAX_AGE,
  TRACKER_LOCATION_DISTANCE_FILTER,
  TRACKER_LOCATION_HIGH_ACCURACY,
} from '../constants';

// import configureStore, { AppWithNavigationState } from "../store";

import Utils from '../util';
import {
  BASE_URL_SOCKET,
  API_DRIVER_UPDATE_LOCATION_BACKGROUND,
  APPLICATION_TOKEN,
} from '../config/WebService';
import {create} from 'apisauce';

class LocationServiceAndroid {
  watchID = null;
  getCurrentLocationAndroid(success, failure, locator) {
    Geolocation.getCurrentPosition(
      position => {
        success(position);
      },
      error => {
        // See error code charts below.
        failure(error.message);
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: LOCATION_HIGH_ACCURACY,
        timeout: LOCATION_TIME_OUT,
        maximumAge: LOCATION_MAX_AGE,
      },
    );
  }

  startTrackingServiceAndroid(success, failure, callback) {
    this.watchID = Geolocation.watchPosition(
      position => {
        const payload = {
          socket_status: '0',
          user_status: 1,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          'user-token': Utils.getUserToken(),
        };
        console.log('abhi taak chalou hai startTrackingServiceAndroid  : ');

        const socketConectionStatus = Utils.getStoreRef().getState()
          .SocketConnetion.isSocketConnected;

        const networkInfoListner = Utils.getStoreRef().getState().networkInfo
          .isNetworkConnected;

        const userStatus = Utils.getStoreRef().getState().user.socket_status;
        const userToken = Utils.getStoreRef().getState().user.data.token;
        console.log('userToken check karou ***** : ', userToken);
        if (!socketConectionStatus && networkInfoListner && userToken) {
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
              console.log(
                ' response aya API_DRIVER_UPDATE_LOCATION_BACKGROUND ',
                response,
              );
            })
            .catch(error => {
              console.log(
                'error aya  API_DRIVER_UPDATE_LOCATION_BACKGROUND : ',
                error,
              );
            });
        } // socket

        success(position);
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
        fastestInterval: 1000,
        interval: 1000,
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

export default new LocationServiceAndroid();
