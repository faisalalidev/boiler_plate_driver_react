// @flow
import React, {createContext, Component} from 'react';
import {View, StatusBar, BackHandler} from 'react-native';
import {Provider} from 'react-redux';
import {StackActions} from 'react-navigation';
import NetworkInfo from './services/NetworkInfo';
import {networkInfoListener} from './actions/NetworkInfoActions';
import {Colors} from './theme';
import {AppState, MessageBar} from './components';
import Utils from './util';
import configureStore, {AppWithNavigationState} from './store';
import Notification from './services/Notification';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './rootNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {navigatorRef} from './services/NavigationService';
import {store, persistor} from './store';
import singleton from './singleton';

export const LoginContext = createContext();

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.state = {
      //   isLoading: true,
      //   store: configureStore(() => {
      //     // this.setState({isLoading: false});
      //     // if (Utils.isPlatformAndroid()) {
      //     // SplashScreen.hide();
      //     // }
      //   }),
      isLogin: false,
      setLogin: this.setLogin,
      isReduxLoaded: false,
    };
  }
  componentDidMount() {
    Utils.setStoreRef(store);
    NetworkInfo.networkInfoListener(store.dispatch, networkInfoListener);
    //   BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    //   Notification.notificationForeground((data) => {
    //     console.log('notificationForeground ******* : src  ', data);
    //   });
  }
  onBeforeLift = () => {
    singleton.storeRef = store;

    this.setState({isReduxLoaded: true}, () => {
      SplashScreen.hide();

      const userObj = store.getState().user.data;

      if (userObj.id) {
        Utils.setUserToken(userObj.token);
        this.setLogin();
      }
      // return rootNavigator(isLoggedIn);
    });
  };
  setLogin = (isLogin = true) => this.setState({isLogin});
  //   componentWillUnmount() {
  //     BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  //   }

  //   onBackPress = () => {
  //     const index = this.state.store.getState().nav.index;
  //     const routeName = this.state.store.getState().nav.routes[index].routeName;
  //     let getNav = this.state.store.getState().nav.routes;
  //     console.log('ON BACK ', getNav);
  //     let navIn = getNav.length === 2 ? 1 : getNav.length > 2 ? 2 : 3;
  //     if (getNav.length === 2 && getNav[navIn]['routes']) {
  //       if (getNav[navIn]['routes'][0]['routes'].length === 1) {
  //         return BackHandler.exitApp();
  //       }
  //     } else if (
  //       getNav.length === 3 &&
  //       getNav[2]['params'] &&
  //       getNav[2]['params'].title === 'Get Help'
  //     ) {
  //       this.state.store.dispatch(StackActions.pop());
  //       return this.state.store.dispatch(StackActions.pop());
  //     }

  //     if ('login'.includes(routeName)) {
  //       return BackHandler.exitApp();
  //     }
  //     return this.state.store.dispatch(StackActions.pop());
  //   };

  render() {
    const {isLoading, isReduxLoaded} = this.state;

    if (isLoading) {
      return null;
    }
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <Provider store={store}>
          <PersistGate onBeforeLift={this.onBeforeLift} persistor={persistor}>
            {isReduxLoaded ? (
              <LoginContext.Provider value={this.state}>
                <RootNavigator ref={navigatorRef} />
              </LoginContext.Provider>
            ) : (
              <View />
            )}
          </PersistGate>
        </Provider>
        <AppState />
        <MessageBar />
      </View>
    );
  }
}
