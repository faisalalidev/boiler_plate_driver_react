import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';

import {
  Login,
  Signup,
  SignUpCarDetail,
  Home,
  ForgotPassword,
  MoreItems,
  CustomDrawerContainer,
  Feeds,
  Profile,
  ChangePassword,
  PersonalDetail,
  CarDetail,
  WebViewContainer,
  // YourRidesTabNavigation,
  Notifications,
  MyTrips,
  MyTripDetails,
  HelpNFAQ,
} from '../containers';
import {ImageButton, AppState, ButtonView, Text} from '../components';
import {Cards, CancelButton} from '../appComponents';
import {Images, Colors, Fonts, Metrics} from '../theme';
import React from 'react';
import {HELP} from '../config/WebService';
import {View, Image} from 'react-native';
import styles from './styles';

// import configureStore from "../store";

const DrawerScreenStack = createStackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: ({navigation}) => {
        return {
          title: 'Home',
          headerRight: <CancelButton navigation={navigation} />,
        };
      },
    },
    myTrips: {
      screen: MyTrips,
      navigationOptions: ({navigation}) => ({
        title: 'My Trips',
      }),
    },
    notifications: {
      screen: Notifications,
      navigationOptions: ({navigation}) => ({
        title: 'Notifications',
      }),
    },
    setting: {
      screen: MoreItems,
      navigationOptions: ({navigation}) => ({
        title: 'Settings',
      }),
    },
    getHelp: {
      screen: WebViewContainer,
      navigationOptions: ({navigation}) => ({
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        title: 'Get Help',
      }),
    },
    helpAndFAQ: {
      screen: HelpNFAQ,
      navigationOptions: ({navigation}) => ({
        // headerTitleStyle: { color: "white" },
        headerStyle: {
          borderBottomWidth: 0,
        },
        title: 'Help & FAQ',
        // headerTransparent: true,
        headerLeft: (
          <ImageButton
            source={Images.leftBlackArrow}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        title: 'Profile',
      }),
    },
    MyTripDetails: {
      screen: MyTripDetails,
      navigationOptions: ({navigation}) => ({
        title: 'Details',
      }),
    },
  },
  {
    gesturesEnabled: false,
    headerMode: 'float',
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft:
        navigation.state.routeName === 'home' ? (
          <ImageButton
            source={Images.drawer}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ) : (
          <ImageButton
            source={Images.leftBlackArrow}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
    }),
    initialRouteName: 'home',
  },
);

const DrawerStack = createDrawerNavigator(
  {
    DrawerStack: {screen: DrawerScreenStack},
  },
  {
    contentComponent: CustomDrawerContainer,

    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    headerMode: 'screen',
    navigationOptions: () => ({
      gesturesEnabled: false,
      // headerStyle: { backgroundColor: "red" },
    }),
  },
);
const routeConfig = createStackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    signup: {
      screen: Signup,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: 'white'},
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTransparent: true,
        headerLeft: (
          <ImageButton
            source={Images.leftWhiteBack}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    webView: {
      screen: WebViewContainer,
      navigationOptions: ({navigation}) => ({
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        title: `${navigation.state.params.title}`,
        headerLeft: (
          <ImageButton
            source={Images.leftBlackArrow}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },

    forgotPassword: {
      screen: ForgotPassword,
      navigationOptions: ({navigation}) => ({
        headerTransparent: true,
        headerLeft: (
          <ImageButton
            source={Images.leftWhiteBack}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    signupCarDetail: {
      screen: SignUpCarDetail,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: 'white'},
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTransparent: true,
        headerLeft: (
          <ImageButton
            source={Images.leftWhiteBack}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    drawerStack: {
      screen: DrawerStack,
      navigationOptions: () => ({
        header: null,
      }),
    },
    changePassword: {
      screen: ChangePassword,
      navigationOptions: ({navigation}) => ({
        title: 'Reset Password',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: (
          <ImageButton
            source={Images.leftBlackArrow}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    personalDetail: {
      screen: PersonalDetail,
      navigationOptions: ({navigation}) => ({
        title: 'Driver Detail',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: (
          <ImageButton
            source={Images.leftBlackArrow}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    carDetail: {
      screen: CarDetail,
      navigationOptions: ({navigation}) => ({
        title: 'Car Detail',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: (
          <ImageButton
            source={Images.leftBlackArrow}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerStyle: {
          backgroundColor: Colors.background.secondary,
          borderBottomWidth: 0,
        },
      };
    },
  },
);

export {routeConfig};
