// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import React, {Component, PureComponent} from 'react';
import {
  View,
  StatusBar,
  Image,
  Animated,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import MapView, {
  ProviderPropType,
  Marker,
  Callout,
  AnimatedRegion,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  ButtonView,
  AppButton,
  ActivityIndicator,
  Loading,
} from '../../components';
import {
  HelpButtons,
  BottomSheet,
  Modal,
  Box,
  RideStatusBar,
  Cards,
  Timer,
  CurrentLocationMarker,
} from '../../appComponents';
import styles from './styles';
import {Metrics, Colors, Images} from '../../theme';
import uber_style from '../../theme/uber_style.json';
import {
  request as userLocationRequest,
  success as userLocationSuccess,
  failure as userLocationFailure,
} from '../../actions/UserLocation';

import LocationService from '../../services/LocationService';
import LocationServiceAndroid from '../../services/LocationServiceAndroid';
import Utils from '../../util';

import {request as requestDriverOnlineStatus} from '../../actions/SocketActions/DriverOnlineStatus';

import {request as requestDriverUpdateLocation} from '../../actions/SocketActions/DriverUpdateLocation';
import {
  request as requestDriverAcceptRide,
  driverRideReducerReset,
} from '../../actions/SocketActions/DriverAcceptRide';
import {request as requestDriverRejectRide} from '../../actions/SocketActions/DriverRejectRide';
import {
  getDriveStatus as requestgetDriveStatus,
  resetGetDrive,
  getDriveTimer,
} from '../../actions/SocketActions/GetDrive';

import {request as requestDriverStartRide} from '../../actions/SocketActions/DriverStartRide';
import {request as requestDriverCancelRide} from '../../actions/SocketActions/DriverCancelRide';
import {request as requestDriverCompleteRide} from '../../actions/SocketActions/DriverCompleteRide';
import {request as requestUploadCompleteRideImage} from '../../actions/UploadCompleteRideImage';
import {
  request as requestShortestPathAction,
  shortestPathReset,
} from '../../actions/GoogleApiActions/ShortestPathAction';
import {request as distanceMatrixRequest} from '../../actions/GoogleApiActions/DistanceMatrixAction';

import {success as successPassengerRejectRide} from '../../actions/SocketActions/PassengerCancelRide';

import {
  DRIVER_ACCEPT_TIMER,
  DISTANCE_TO_REACH_PASSENGER,
} from '../../constants';

import firebase, {RemoteMessage, NotificationOpen} from 'react-native-firebase';
import Notification from '../../services/Notification';

import {
  DRIVER_RIDE_GET_DRIVE,
  PASSENGER_RIDE_REJECTED,
  APPLICATION_TOKEN,
  BASE_URL_SOCKET,
  API_DRIVER_UPDATE_LOCATION_BACKGROUND,
  ERROR_NETWORK_NOT_AVAILABLE,
} from '../../config/WebService';

const fullHeight = Metrics.screenHeight - 64;
const cardHeight = Metrics.screenHeight - 467;
// const LATITUDE = 40.665364;
// const LONGITUDE = -74.213377;

const LATITUDE = 38.309162;
const LONGITUDE = -92.527436;

import {create} from 'apisauce';

class Home extends Component {
  constructor(props) {
    super(props);
    const {getDrive, driverRideReducer, driverStartRide} = props;
    let mapHeight;

    this.state = {
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      latitude: '0',
      longitude: '0',
      timer: DRIVER_ACCEPT_TIMER,
      timerVisibility: false,
      cancelRide: false,
      isMapReady: false,
      showCurrentLocation: false,
      degree: 0,
      scrollEnabled: mapHeight,
      isFocusedCurrentLoc: false,
      trackingCoordinate: new AnimatedRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      completeRideLoader: false,
    };
  }
  componentDidMount() {
    Notification.notificationPermission()
      .then((bool) => {
        console.warn('notificationPermission :', bool);
      })
      .catch((error) => {
        console.warn('notificationPermission err :', error);
      });

    // Notification.notificationForeground(data => {
    //   console.log("notificationForeground home : ", data);
    // });
    if (Utils.isPlatformAndroid()) {
      this._requestLocationPermission();
    } else {
      this._currentLocation();
      this._startTracking();
    }

    if (
      this.props.getDrive.getDriveStatus &&
      !this.props.driverRideReducer.driverRideStatus &&
      !this.props.driverStartRide.startTripStatus
    ) {
      this._runTimer();
    }
  }

  componentDidUpdate(prevProps) {
    const preLocation = prevProps.userLocation;
    const preGetDrive = prevProps.getDrive;
    const preSocketConnetion = prevProps.SocketConnetion;
    const prepassengerCancelRide = prevProps.passengerCancelRide;
    const preShortestPath = prevProps.shortestPath;

    const {
      driverRideReducer,
      userLocation,
      getDrive,
      shortestPath,
      driverStartRide,
      SocketConnetion,
      user,
      passengerCancelRide,
    } = this.props;

    // const address = getDrive.data.address;
    if (preSocketConnetion !== SocketConnetion) {
      if (SocketConnetion.isSocketConnected) {
        // when socket get disconnect and connected again  . so it tells  updated state for user
        const payload = {
          status: this.props.user.socket_status == 1 ? '1' : '0',
        };
        if (this.props.networkInfo) {
          if (SocketConnetion.isSocketConnected) {
            this.props.requestDriverOnlineStatus(payload);
          }
        }
      }
    }

    if (
      preLocation &&
      preLocation.coordinate !== this.props.userLocation.coordinate &&
      this.state.isMapReady &&
      user.socket_status == '1'
    ) {
      //checking user online and location updating as well
      if (
        !_.isEmpty(driverRideReducer.driverAcceptData) &&
        driverRideReducer.driverRideStatus &&
        !driverStartRide.startTripStatus
      ) {
        const payload = {
          origin: `${userLocation.coordinate.latitude},${userLocation.coordinate.longitude}`,
          destination: `${this.props.getDrive.data.address.address_pickup_latitude},${this.props.getDrive.data.address.address_pickup_longitude}`,
          departure_time: 'now',
        };
        this.props.requestShortestPathAction(payload, (data) => {
          const payload = {
            latitude: this.props.userLocation.coordinate.latitude,
            longitude: this.props.userLocation.coordinate.longitude,
            updated_polyline_overview: this.props.shortestPath.data[0]
              .overview_polyline.points,
          };

          this.props.requestDriverUpdateLocation(payload);

          const latitude = preShortestPath.polyLinecoordinates[0].latitude;
          const longitude = preShortestPath.polyLinecoordinates[0].longitude;

          newCoordinate = {
            latitude: this.props.shortestPath.polyLinecoordinates[0].latitude,
            longitude: this.props.shortestPath.polyLinecoordinates[0].longitude,
          };
          this.state.trackingCoordinate
            .timing({...newCoordinate, duration: 500})
            .start();
          if (!this.state.isFocusedCurrentLoc) {
            this.setState(
              {
                maxZoomLevel: 18,
              },
              () => {
                Utils.focusOnMapCoordinates(this.map, [newCoordinate]);
                this.setState({
                  isFocusedCurrentLoc: true,
                });
              },
            );
          }
          //end of cordinates
          this.setState({
            degree: Utils.bearing(
              latitude,
              longitude,
              this.props.shortestPath.polyLinecoordinates[0].latitude,
              this.props.shortestPath.polyLinecoordinates[0].longitude,
            ),
          });
        });
      } else if (
        !_.isEmpty(driverStartRide.data) &&
        driverStartRide.startTripStatus
      ) {
        const payload = {
          origin: `${userLocation.coordinate.latitude},${userLocation.coordinate.longitude}`,
          destination: `${this.props.getDrive.data.address.dropOffLocation_latitude},${this.props.getDrive.data.address.dropOffLocation_longitude}`,
          departure_time: 'now',
        };
        this.props.requestShortestPathAction(payload, (data) => {
          const payload = {
            latitude: this.props.userLocation.coordinate.latitude,
            longitude: this.props.userLocation.coordinate.longitude,
            updated_polyline_overview: this.props.shortestPath.data[0]
              .overview_polyline.points,
          };
          this.props.requestDriverUpdateLocation(payload);

          const latitude = preShortestPath.polyLinecoordinates[0].latitude;
          const longitude = preShortestPath.polyLinecoordinates[0].longitude;

          newCoordinate = {
            latitude: this.props.shortestPath.polyLinecoordinates[0].latitude,
            longitude: this.props.shortestPath.polyLinecoordinates[0].longitude,
          };
          this.state.trackingCoordinate
            .timing({...newCoordinate, duration: 500})
            .start();
          if (!this.state.isFocusedCurrentLoc) {
            this.setState(
              {
                maxZoomLevel: 18,
              },
              () => {
                Utils.focusOnMapCoordinates(this.map, [newCoordinate]);
                this.setState({
                  isFocusedCurrentLoc: true,
                });
              },
            );
          }
          //end of cordinates
          this.setState({
            degree: Utils.bearing(
              latitude,
              longitude,
              this.props.shortestPath.polyLinecoordinates[0].latitude,
              this.props.shortestPath.polyLinecoordinates[0].longitude,
            ),
          });
        });
      } else {
        const payload = {
          latitude: this.props.userLocation.coordinate.latitude,
          longitude: this.props.userLocation.coordinate.longitude,
        };
        this.props.requestDriverUpdateLocation(payload);
        this.setState({
          degree: Utils.bearing(
            preLocation.coordinate.latitude,
            preLocation.coordinate.longitude,
            this.props.userLocation.coordinate.latitude,
            this.props.userLocation.coordinate.longitude,
          ),
        });
      }

      // when driver is not in ride
    } // eof location movement conditions

    if (
      preGetDrive.getDriveStatus !== this.props.getDrive.getDriveStatus &&
      this.props.getDrive.getDriveStatus
    ) {
      this.props.getDriveTimer(new Date().getTime());
      this._runTimer();

      // pickup is given at destination just becase driver is going towards passenger
      const address = this.props.getDrive.data.address;
      const payload = {
        origin: `${userLocation.coordinate.latitude},${userLocation.coordinate.longitude}`,
        destination: `${address.address_pickup_latitude},${address.address_pickup_longitude}`,
        departure_time: 'now',
      };
      this.props.requestShortestPathAction(payload);
    }

    if (
      prepassengerCancelRide.getPassengerCancelStatus !==
        passengerCancelRide.getPassengerCancelStatus &&
      passengerCancelRide.getPassengerCancelStatus
    ) {
      this._onPassengerRejectRideSuccess();
    }
  } // end of didUpdate

  _requestLocationPermission = async () => {
    const check = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (!check) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'RYDR needs location permission to work.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Location permission granted
          // this._startLocationService(granted);
          this.props.userLocationRequest(granted);
          this._currentLocation();
          this._startTracking();
        } else {
          // Location permission denied
          this.props.userLocationRequest(granted);
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // location permission already allowed
      this._currentLocation();
      this._startTracking();
    }
  };

  _startTracking = () => {
    if (Utils.isPlatformAndroid()) {
      LocationServiceAndroid.startTrackingServiceAndroid(
        this.props.userLocationSuccess,
        this.props.userLocationFailure,
        this.watchPositionSuccess,
      );
    } else {
      LocationService.startTrackingService(
        this.props.userLocationSuccess,
        this.props.userLocationFailure,
        navigator.geolocation,
        this.watchPositionSuccess,
      );
    }
  };

  _currentLocation = () => {
    if (Utils.isPlatformAndroid()) {
      LocationServiceAndroid.getCurrentLocationAndroid(
        this.props.userLocationSuccess,
        this.props.userLocationFailure,
      );
    } else {
      LocationService.getCurrentLocation(
        this.props.userLocationSuccess,
        this.props.userLocationFailure,
        navigator.geolocation,
      );
    }
    const newCoordinate = {
      latitude: +this.props.userLocation.coordinate.latitude,
      longitude: +this.props.userLocation.coordinate.longitude,
    };

    this.setState(
      {
        maxZoomLevel: 18,
      },
      () => {
        Utils.focusOnMapCoordinates(this.map, [newCoordinate]);
      },
    );
  };

  watchPositionSuccess = (position) => {
    console.log('watchPositionSuccess callback*******  : ', position);
    let data = {
      latlng: position.coords.latitude + ',' + position.coords.longitude,
    };
    newCoordinate = {
      latitude: +position.coords.latitude,
      longitude: +position.coords.longitude,
    };
    const {driverRideReducer} = this.props;
    if (!driverRideReducer.driverRideStatus) {
      console.log('should be not run when you are in ride ');
      this.state.trackingCoordinate
        .timing({...newCoordinate, duration: 500})
        .start();
      if (!this.state.isFocusedCurrentLoc) {
        this.setState(
          {
            maxZoomLevel: 18,
          },
          () => {
            Utils.focusOnMapCoordinates(this.map, [newCoordinate]);
            this.setState({
              isFocusedCurrentLoc: true,
            });
          },
        );
      }
    }
  };

  // _stopTracking() {
  //   navigator.geolocation.clearWatch(LocationService.getWatchID());
  //   navigator.geolocation.stopObserving();
  // }

  _shortestPathAction = (address) => {
    const {userLocation} = this.props;

    const payload = {
      origin: `${userLocation.coordinate.latitude},${userLocation.coordinate.longitude}`,
      destination: `${address.dropOffLocation_latitude},${address.dropOffLocation_longitude}`, // pickup is given at destination just becase driver is going towards passenger
      departure_time: 'now',
    };
    this.props.requestShortestPathAction(payload, (data) => {
      const payload = {
        overview_polyline: this.props.shortestPath.data[0].overview_polyline
          .points,
      };
      this.props.requestDriverStartRide(payload);
    });
  };

  _distanceMatrix = () => {
    const payload = {
      origins:
        this.props.userLocation.coordinate.latitude +
        ',' +
        this.props.userLocation.coordinate.longitude,
      destinations:
        this.props.getDrive.data.address.address_pickup_latitude +
        ',' +
        this.props.getDrive.data.address.address_pickup_longitude,
    };

    this.props.distanceMatrixRequest(payload);
  };

  _starRating() {
    const payload = {
      data: true,
    };
    this.props.yourRatingRequest(payload);
    let getStarValue = this.rating._rating();
    this.rating.hide();
  }

  _renderDriverOnline = (user) => {
    const {showCurrentLocation} = this.state;
    const {SocketConnetion} = this.props;

    return (
      <View style={styles.appButtonContainer}>
        <ButtonView
          onPress={() => this._currentLocation()}
          style={{
            position: 'absolute',
            right: 15,
            top: 15,
          }}>
          <Image source={Images.currentLocation} />
        </ButtonView>
        <AppButton
          style={
            user.socket_status == 1
              ? {backgroundColor: Colors.appbutton.danger}
              : {backgroundColor: Colors.appbutton.secondary}
          }
          // 1 = online
          // 0 = offline
          buttonTitle={user.socket_status == 1 ? 'Go Offline' : 'Go Online'}
          onPress={() => {
            const payload = {
              status: this.props.user.socket_status == 1 ? '0' : '1',
            };
            const payloadLocation = {
              latitude: this.props.userLocation.coordinate.latitude,
              longitude: this.props.userLocation.coordinate.longitude,
            };

            if (this.props.networkInfo) {
              if (SocketConnetion.isSocketConnected) {
                this.props.requestDriverOnlineStatus(payload);
                this.props.requestDriverUpdateLocation(payloadLocation);
              }
            } else {
              Utils.MessageAlertError(
                ERROR_NETWORK_NOT_AVAILABLE.title,
                ERROR_NETWORK_NOT_AVAILABLE.message,
              );
            }
          }}
          isFetching={this.props.driverOnlineStatus.isFetching}
        />
      </View>
    );
  };

  onRideAcceptSuccess = (data) => {
    const {getDrive} = this.props;
    this.setState({
      timer: DRIVER_ACCEPT_TIMER,
      timerVisibility: false,
    });
    clearInterval(this.time);
    this._distanceMatrix();
    this.props.getDriveTimer(0);
  };
  // Timer
  time;
  _runTimer = () => {
    //milliseconds
    let {timer} = this.state;
    const {getDrive, SocketConnetion} = this.props;
    console.log('SocketConnetion ******* ', SocketConnetion);

    this.setState({timerVisibility: true});
    this.time = setInterval(() => {
      let time =
        30 -
        (
          (new Date().getTime() - this.props.getDrive.getDriverTimer) /
          1000
        ).toFixed();
      if (time > 0) {
        this.setState({timer: time});
      } else {
        clearInterval(this.time);
        if (this.props.networkInfo) {
          if (SocketConnetion.isSocketConnected) {
            const payload = {
              trip_id: this.props.getDrive.data.trip_id,
              socket_id: this.props.getDrive.data.socket_id,
              data: this.props.getDrive.data,
            };
            this.props.requestDriverRejectRide(
              payload,
              this._onRideRejectSuccess,
            );
          }
        } else {
          Utils.MessageAlertError(
            ERROR_NETWORK_NOT_AVAILABLE.title,
            ERROR_NETWORK_NOT_AVAILABLE.message,
          );
        }
      }
    }, 1000);
  };

  _onRideRejectSuccess = (data) => {
    this.props.requestgetDriveStatus(false);
    this.setState({
      timer: DRIVER_ACCEPT_TIMER,
      timerVisibility: false,
    });
    clearInterval(this.time);
  };
  _onPassengerRejectRideSuccess = (data) => {
    this.props.requestgetDriveStatus(false);
    // !getDrive false ho and passengerRejectRide true ho
    this.setState({
      timer: DRIVER_ACCEPT_TIMER,
      timerVisibility: false,
    });
    clearInterval(this.time);
  };

  // Card UI START
  _renderConfirmRideCard = (getDrive) => {
    const {SocketConnetion, shortestPath} = this.props;
    return (
      <BottomSheet
        ref={(ref) => {
          this.RBSheet = ref;
        }}
        height={328}
        duration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
          },
        }}
        onClose={() => null}>
        <Cards.RideAcceptCard
          accpetTitle="Accept Ride"
          rejectTitle="Reject Ride"
          data={getDrive.data}
          accpetPress={() => {
            if (this.props.networkInfo) {
              if (SocketConnetion.isSocketConnected) {
                const payload = {
                  trip_id: this.props.getDrive.data.trip_id,
                  socket_id: this.props.getDrive.data.socket_id,
                  data: this.props.getDrive.data,
                  overview_polyline:
                    shortestPath.data[0] &&
                    shortestPath.data[0].overview_polyline
                      ? shortestPath.data[0].overview_polyline.points
                      : '',
                };
                this.props.requestDriverAcceptRide(
                  payload,
                  this.onRideAcceptSuccess,
                );
                const payloadDriverUpdateLocation = {
                  latitude: this.props.userLocation.coordinate.latitude,
                  longitude: this.props.userLocation.coordinate.longitude,
                };
                this.props.requestDriverUpdateLocation(
                  payloadDriverUpdateLocation,
                );
              }
            } else {
              Utils.MessageAlertError(
                ERROR_NETWORK_NOT_AVAILABLE.title,
                ERROR_NETWORK_NOT_AVAILABLE.message,
              );
            }
          }}
          rejectPress={() => {
            if (this.props.networkInfo) {
              if (SocketConnetion.isSocketConnected) {
                const payload = {
                  trip_id: this.props.getDrive.data.trip_id,
                  socket_id: this.props.getDrive.data.socket_id,
                  data: this.props.getDrive.data,
                };
                this.props.requestDriverRejectRide(
                  payload,
                  this._onRideRejectSuccess,
                );
              }
            } else {
              Utils.MessageAlertError(
                ERROR_NETWORK_NOT_AVAILABLE.title,
                ERROR_NETWORK_NOT_AVAILABLE.message,
              );
            }
          }}
        />
      </BottomSheet>
    );
  };

  _renderStartTrip = (getDrive) => {
    const {SocketConnetion} = this.props;
    return (
      <BottomSheet
        ref={(ref) => {
          this.RBSheet = ref;
        }}
        height={328}
        duration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
          },
        }}
        onClose={() => null}>
        <Cards.RideAcceptCard
          data={getDrive.data}
          oneButtonTitle="Start Trip"
          oneButtonOnPress={() => {
            if (this.props.networkInfo) {
              if (SocketConnetion.isSocketConnected) {
                this._shortestPathAction(getDrive.data.address);
              }
            } else {
              Utils.MessageAlertError(
                ERROR_NETWORK_NOT_AVAILABLE.title,
                ERROR_NETWORK_NOT_AVAILABLE.message,
              );
            }
          }}
          isFetching={this.props.driverStartRide.isFetching}
        />
      </BottomSheet>
    );
  };

  _renderCompleteTrip = (getDrive) => {
    return (
      <BottomSheet
        ref={(ref) => {
          this.RBSheet = ref;
        }}
        height={403}
        duration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
          },
        }}
        onClose={(bool) => null}
        // onClose={bool =>
        //   this.setState({
        //     scrollEnabled: bool ? cardHeight : Metrics.screenHeight - 174
        //   })
        // }
        minClosingWidth="100%">
        <Cards.CompleteRideCard
          navImg={Images.selectDestination}
          data={getDrive.data}
          userData={this.props.user}
          btnText="Complete Trip"
          onPress={() => {
            this.completeRidePop.show();
          }}
          isFetching={this.props.inRideStatus.isFetching}
        />
      </BottomSheet>
    );
  };

  _completeRidePop = () => {
    const {SocketConnetion} = this.props;
    return (
      <Modal.Dialogue
        ref={(ref) => {
          this.completeRidePop = ref;
        }}
        description="Are you sure you want to complete ride ?"
        title="Complete Ride"
        leftButton="Yes"
        rightButton="No"
        isButton
        leftButtonPress={() => {
          if (this.props.networkInfo) {
            if (SocketConnetion.isSocketConnected) {
              this.map.fitToElements(true);
              // api paay hit jaay tou complete ride pop hatna hai and saga sa reset
              this.completeRidePop.hide();
              // this.setState({ completeRideLoader: true });
              const snapshot = this.map.takeSnapshot({
                width: 300,
                height: 300,
                format: 'png', // image formats: 'png', 'jpg' (default: 'png')
                quality: 0.2, // image quality: 0..1 (only relevant for jpg, default: 1)
                result: 'base64', // result types: 'file', 'base64' (default: 'file')
              });

              snapshot.then((uri) => {
                console.log('snapshot uri : ', uri);
                // const payload = {
                //   image: `data:image/tmp;base64,${uri}`,
                //   trip_id: this.props.getDrive.data.trip_id
                // };

                const formData = new FormData();
                formData.append('image', `data:image/tmp;base64,${uri}`);
                formData.append('trip_id', this.props.getDrive.data.trip_id);
                this.props.requestUploadCompleteRideImage(formData);

                // this.props.requestUploadCompleteRideImage(payload);
                // todo
                // this.props.requestDriverCompleteRide(payload, data => {
                //   // Utils.MessageAlertSuccess("Ride Completed");
                //   // this.setState({ scrollEnabled: fullHeight });
                // });
              });
            }
          } else {
            Utils.MessageAlertError(
              ERROR_NETWORK_NOT_AVAILABLE.title,
              ERROR_NETWORK_NOT_AVAILABLE.message,
            );
          }
        }}
        rightButtonPress={() => this.completeRidePop.hide()}
      />
    );
  };

  // Google map Work
  onMapLayout = () => {
    this.setState({isMapReady: true});
  };
  _renderMapMarker = (item, image, anchor = {x: 0.5, y: 0.5}) => {
    return (
      <MapView.Marker
        key={item.id}
        identifier="marker"
        coordinate={{
          latitude: +item.latitude,
          longitude: +item.longitude,
        }}
        style={{
          flex: 1,
          width: Metrics.screenWidth,
          heigh: Metrics.screenHeight,
        }}
        rotation={this.state.degree}
        flat={true}
        anchor={anchor}
        image={image}
        calloutAnchor={{x: 0.5, y: 0.2}}
      />
    );
  };
  onRegionChangeComplete = (region) => {
    this.setState({
      maxZoomLevel: 23,
    });
  };

  render() {
    const {
      userLocation,
      user,
      driverOnlineStatus,
      getDrive,
      driverAcceptRide,
      driverRejectData,
      driverRideReducer,
      shortestPath,
      driverStartRide,
    } = this.props;
    const {
      latitude,
      longitude,
      timer,
      isMapReady,
      maxZoomLevel,
      timerVisibility,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <MapView
          initialRegion={{
            // latitude: userLocation.coordinate.latitude,
            // longitude: userLocation.coordinate.longitude,
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: Metrics.LATITUDE_DELTA,
            longitudeDelta: Metrics.LONGITUDE_DELTA,
          }}
          cacheEnabled
          customMapStyle={uber_style}
          provider={PROVIDER_GOOGLE}
          loadingIndicatorColor="#e21d1d"
          ref={(map) => (this.map = map)}
          style={{
            flex: 1,
            width: Metrics.screenWidth,
            height: Metrics.screenHeight,
          }}
          loadingEnabled={true}
          maxZoomLevel={this.state.maxZoomLevel}
          onMapReady={this.onMapLayout}
          onRegionChangeComplete={this.onRegionChangeComplete}>
          {isMapReady && !driverRideReducer.driverRideStatus ? (
            // before ride
            <Marker.Animated
              style={{
                flex: 1,
                width: Metrics.screenWidth,
                heigh: Metrics.screenHeight,
              }}
              coordinate={this.state.trackingCoordinate}
              rotation={this.state.degree}
              flat={true}
              anchor={{x: 0.5, y: 0.5}}
              image={Images.mapMarker}
              ref={(ref) => (this.currentLocation = ref)}
            />
          ) : null}

          {/* after accepting ride / during ride polyline  */}
          {(isMapReady && driverRideReducer.driverRideStatus) ||
          (isMapReady && getDrive.getDriveStatus) ? (
            <MapView.Polyline
              identifier={'drivingRoute'}
              coordinates={shortestPath.polyLinecoordinates}
              strokeColor={Colors.polyLine}
              strokeWidth={4}
            />
          ) : null}

          {/* during ride polyline driver start point and end point */}
          {/* this._renderMapMarker(
            {
              id: "mapCar",
              latitude: this.props.userLocation.coordinate.latitude,
              longitude: this.props.userLocation.coordinate.longitude
            },
            Images.mapCar
          ) */}
          {/*driverRideReducer.driverRideStatus &&
          shortestPath.polyLinecoordinates.length > 0 &&
          isMapReady ? (
            <Marker.Animated
              style={{
                flex: 1
              }}
              coordinate={this.state.trackingCoordinate}
              rotation={this.state.degree}
              flat={true}
              anchor={{ x: 0.5, y: 0.5 }}
              image={Images.mapCar}
              ref={ref => (this.mapCar = ref)}
            />
            ) : null */}

          {/* this._renderMapMarker(
                {
                  id: "capStart",
                  latitude: this.props.shortestPath.polyLinecoordinates[0]
                    .latitude,
                  longitude: this.props.shortestPath.polyLinecoordinates[0]
                    .longitude
                },
                Images.mapCar
              ) */}
          {driverRideReducer.driverRideStatus &&
          shortestPath.polyLinecoordinates.length > 0 &&
          isMapReady ? (
            <Marker.Animated
              style={{
                flex: 1,
              }}
              coordinate={this.state.trackingCoordinate}
              rotation={this.state.degree}
              flat={true}
              anchor={{x: 0.5, y: 0.5}}
              image={Images.mapCar}
              ref={(ref) => (this.mapCar = ref)}
            />
          ) : null}

          {driverRideReducer.driverRideStatus &&
          shortestPath.polyLinecoordinates.length > 0 &&
          isMapReady
            ? this._renderMapMarker(
                {
                  id: 'capEnd',
                  latitude: this.props.shortestPath.polyLinecoordinates[
                    this.props.shortestPath.polyLinecoordinates.length - 1
                  ].latitude,
                  longitude: this.props.shortestPath.polyLinecoordinates[
                    this.props.shortestPath.polyLinecoordinates.length - 1
                  ].longitude,
                },
                Images.capEnd,
              )
            : null}
        </MapView>
        {getDrive.getDriverTimer ? (
          <Timer image={Images.time} item={{time: timer + ' Seconds'}} />
        ) : null}
        {/* ${this.props.todayDriverEarning.data */}
        {!this.state.timerVisibility &&
        !getDrive.getDriverTimer &&
        !driverRideReducer.driverRideStatus ? (
          <Box
            amount={`$ ${this.props.todayDriverEarning.data.Earning}`}
            detail="Today's Earning"
          />
        ) : null}
        {/* driver accept ride help button appear */}
        {driverRideReducer.driverRideStatus &&
        getDrive.getDriveStatus &&
        !driverStartRide.startTripStatus ? (
          <HelpButtons
            leftTitle="Call Passenger"
            leftImage={Images.phone}
            leftOnPress={() =>
              Utils.openCall(`tel:${getDrive.data.passenger.mobile_no}`)
            }
            rightOnPress={() => {
              Utils.openSms(`sms:${getDrive.data.passenger.mobile_no}`);
            }}
            rightImage={Images.email}
            leftButtonStyle={{marginRight: 5}}
            rightTitle="Sms Passenger"
            rightButtonStyle={{
              backgroundColor: Colors.appbutton.black,
            }}
          />
        ) : null}
        {/* during trip ride status appear at top */}
        {driverStartRide.startTripStatus ? (
          <RideStatusBar rideTitle="Ride in Progress" image={Images.car} />
        ) : null}

        {!getDrive.getDriveStatus ? this._renderDriverOnline(user) : null}
        {getDrive.getDriveStatus &&
        timer != 0 &&
        !driverRideReducer.driverRideStatus
          ? this._renderConfirmRideCard(getDrive)
          : null}

        {getDrive.getDriveStatus &&
        driverRideReducer.driverRideStatus &&
        !driverStartRide.startTripStatus
          ? this._renderStartTrip(getDrive)
          : null}
        {/* complete ride card */}
        {driverStartRide.startTripStatus && getDrive.getDriveStatus
          ? this._renderCompleteTrip(getDrive)
          : null}

        {this._completeRidePop()}

        {/* <Loading loading={this.props.inRideStatus.isFetching} /> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  user: state.user.data,
  SocketConnetion: state.SocketConnetion,
  driverOnlineStatus: state.driverOnlineStatus,
  passengerCancelRide: state.passengerCancelRide,
  getDrive: state.getDrive,
  driverAcceptRide: state.driverRideReducer.driverAcceptData,
  driverRejectData: state.driverRideReducer.driverRejectData,
  driverRideReducer: state.driverRideReducer,
  driverStartRide: state.driverStartRide,
  shortestPath: state.shortestPathReducer,
  distanceMatrix: state.distanceMatrix,
  inRideStatus: state.inRideStatus,
  networkInfo: state.networkInfo.isNetworkConnected,
  todayDriverEarning: state.todayDriverEarning,
});

const actions = {
  userLocationRequest,
  userLocationSuccess,
  userLocationFailure,
  requestDriverUpdateLocation,
  requestDriverOnlineStatus,

  driverRideReducerReset,
  requestDriverAcceptRide,
  requestDriverRejectRide,
  requestgetDriveStatus,
  requestDriverStartRide,
  getDriveTimer,
  requestDriverCancelRide,
  requestDriverCompleteRide,
  requestUploadCompleteRideImage,
  requestShortestPathAction,
  shortestPathReset,
  distanceMatrixRequest,
  successPassengerRejectRide,
};

export default connect(mapStateToProps, actions)(Home);
