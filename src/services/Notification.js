import firebase from 'react-native-firebase';

import {Platform} from 'react-native';
const notifications = firebase.notifications();
class Notification {
  hasPermission = callback => {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log('permission : ', enabled);
          // user has permissions
          callback(enabled);
        } else {
          callback(enabled);
          console.log("permission user doesn't have permission : ", enabled);
          // user doesn't have permission
        }
      });
  };

  notificationPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions

      return enabled;
    } else {
      try {
        const requestPermission = await firebase
          .messaging()
          .requestPermission();
        // User has authorised

        return requestPermission;
      } catch (error) {
        console.log('Error : ', error);
        return error;
        // User has rejected permissions
      }
      // user doesn't have permission
    }
  };

  fcmToken = callback => {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          console.log('fcm token : ', fcmToken);
          callback(fcmToken);
        } else {
          callback(fcmToken);
          console.log("user doesn't have a device token yet");
          // user doesn't have a device token yet
        }
      });
  };

  // works from kill state to foreground state
  notificationInitialize = callback => {
    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        console.log('notificationForeground class ', notificationOpen);
        if (notificationOpen) {
          const action = notificationOpen.action;
          const notification: Notification = notificationOpen.notification;
          callback(notification);
        }
      })
      .catch(error => {
        callback(error);
      });
  };

  onNotificationOpened = callback => {
    firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        callback(notification);
      });
  };

  notificationForeground = callback => {
    firebase.notifications().onNotification((notification: Notification) => {
      callback(notification);

      console.log('notificationForeground class ', notification);

      // test
      const channelId = new firebase.notifications.Android.Channel(
        'Default',
        'Default',
        firebase.notifications.Android.Importance.High,
      );
      firebase.notifications().android.createChannel(channelId);

      let notification_to_be_displayed = new firebase.notifications.Notification(
        {
          data: notification.data,
          sound: 'default',
          show_in_foreground: true,
          title: notification.title,
          body: notification.body,
        },
      );
      if (Platform.OS == 'android') {
        notification_to_be_displayed.android
          .setPriority(firebase.notifications.Android.Priority.High)
          .android.setChannelId('Default')
          .setSound('default')
          .android.setAutoCancel(true)
          .android.setSmallIcon('ic_launcher');
      }

      firebase
        .notifications()
        .displayNotification(notification_to_be_displayed);

      if (Platform.OS === 'android') {
        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true,
        }).android
          .setChannelId('notification-channel') // e.g. the id you chose above
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          // .setSound('default')
          .setData(notification.data)
          .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
          //.android.setColor('#000000') // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);
        console.log('localNotification: ', localNotification);
        // firebase
        //   .notifications()
        //   .displayNotification(localNotification)
        //   .catch(err => console.error(err));
      } else if (Platform.OS === 'ios') {
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .ios.setBadge(notification.ios.badge);

        // firebase
        //   .notifications()
        //   .displayNotification(localNotification)
        //   .catch(err => console.error(err));
      }
    });
  };
}
export default new Notification();
