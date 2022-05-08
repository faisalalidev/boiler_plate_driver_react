import _ from 'lodash';
import moment from 'moment';
import {
  Platform,
  Share,
  Linking,
  Alert,
  Keyboard,
  Animated,
} from 'react-native';
import {MessageBarManager} from 'react-native-message-bar';
import {TIME_ZONE, DAY_DATE_FORMAT, DATE_FORMAT} from '../constants';
import {BASE_URL} from '../config/WebService';
import haversine from 'haversine';

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

let socketAccessToken;
let user_id;
let storeRef;
let socketRef;

class Util {
  setStoreRef(ref) {
    storeRef = ref;
  }
  getStoreRef() {
    return storeRef;
  }

  setSocketRef(ref) {
    socketRef = ref;
  }
  getSocketRef() {
    return socketRef;
  }

  isEmpty = (value) => _.isEmpty(value);
  keyExtractor = (item, index) => index;
  getPlatform = () => Platform.OS;
  isPlatformAndroid = () => Platform.OS === 'android';

  setUserToken(token) {
    userToken = token;
  }
  getUserToken() {
    return userToken;
  }
  setSocketAccessToken(accessToken) {
    socketAccessToken = accessToken;
  }
  getSocketAccessToken() {
    return socketAccessToken;
  }
  setUserIDFromSocket(UserIDFromSocket) {
    user_id = UserIDFromSocket;
  }
  getUserIDFromSocket() {
    return user_id;
  }

  // dateFormatHandler(date) {
  //   let getDate = moment(date).calendar();
  //   if (getDate.indexOf("Today") != -1) {
  //     return "Today";
  //   } else if (getDate.indexOf("Yesterday") != -1) {
  //     return "Yesterday";
  //   } else {
  //     return moment(date).format("DD MMM YYYY");
  //   }
  // }
  dateFormatHandler(date) {
    var GetDate = new Date(date).toDateString();
    var NewDate = new Date().toDateString();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1);
    tomorrow = new Date(tomorrow).toDateString();
    if (GetDate === NewDate) {
      return 'Today';
    } else if (GetDate === tomorrow) {
      return 'Yesterday';
    } else {
      return date;
    }
  }

  keyboardDismiss() {
    return Keyboard.dismiss();
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  onShare = (title, message) => {
    Share.share({
      title,
      message,
    });
  };

  noInternetMessage = () => {
    MessageBarManager.showAlert({
      title: 'No Internet Connection Found',
      message: 'Make sure wi-fi or celluar data is turned on',
      alertType: 'error',
    });
  };

  MessageAlertError = (title, message) => {
    MessageBarManager.showAlert({
      title,
      message,
      alertType: 'error',
    });
  };

  MessageAlertSuccess = (title, message) => {
    MessageBarManager.showAlert({
      title,
      message,
      alertType: 'success',
    });
  };

  removeWhiteSpaces(value) {
    return value.replace(/^\s+|\s+$/gm, '');
  }
  lineCounter(value = '') {
    return value.split(/\r\n|\r|\n/).length;
  }
  getCurrentDayDate() {
    return moment(Date.now()).format(DATE_FORMAT);
  }

  getCurrentDate() {
    return moment(Date.now()).format(DAY_DATE_FORMAT);
  }

  getDateFrom(givenDate) {
    return moment(givenDate).add(TIME_ZONE, 'hours').fromNow();
  }

  getLinking(googleUrl) {
    return Linking.canOpenURL(googleUrl).then((supported) => {
      if (supported) {
        Linking.openURL(googleUrl);
      }
    });
  }

  imageUrlConverter(image_url) {
    return `${BASE_URL}${image_url}`;
  }

  howLongAgo(milliseconds) {
    let ago = moment(milliseconds).fromNow();
    if (ago.indexOf('seconds') !== -1) {
      return ago.replace('seconds', 's');
    } else if (ago.indexOf('minutes') !== -1) {
      return ago.replace(' minutes', 'm');
    } else if (ago.indexOf('hours') !== -1) {
      return ago.replace(' hours', 'h');
    } else if (ago.indexOf('days') !== -1) {
      return ago.replace(' days', 'd');
    } else if (ago.indexOf('weeks') !== -1) {
      return ago.replace(' weeks', 'w');
    } else if (ago.indexOf('months') !== -1) {
      return ago.replace(' months', 'M');
    } else if (ago.indexOf('years') !== -1) {
      return ago.replace(' years', 'y');
    }
  }

  focusOnMapCoordinates(map, markers, edgePadding = this.EdgePadding) {
    options = {
      edgePadding: edgePadding,
      animated: true,
    };
    map.fitToCoordinates(markers, options);
  }

  openCall(url) {
    return Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }
  openSms(url) {
    return Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }

  // Converts from degrees to radians.
  toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  // Converts from radians to degrees.
  toDegrees(radians) {
    return (radians * 180) / Math.PI;
  }

  bearing(startLat, startLng, destLat, destLng) {
    startLat = this.toRadians(startLat);
    startLng = this.toRadians(startLng);
    destLat = this.toRadians(destLat);
    destLng = this.toRadians(destLng);

    y = Math.sin(destLng - startLng) * Math.cos(destLat);
    x =
      Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);

    brng = Math.atan2(y, x);
    brng = this.toDegrees(brng);

    return (brng + 360) % 360;
  }
  calcDistance = (prevLatLng, newLatLng) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };
  millSeconds() {
    return moment().milliseconds();
  }

  // dataModeling(data) {

  //   return data;
  // }
}

export default new Util();
