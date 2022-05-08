// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  Image,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import {Images, Metrics, Fonts, Colors, Strings} from '../../theme';
import {
  Text,
  Loading,
  ButtonView,
  Button,
  Separator,
  TextFieldBorder,
  AppLogoText,
  BoldHeading,
  AppButton,
} from '../../components';
import styles from './styles';
import Utils from '../../util';
import Notification from '../../services/Notification';
import KeyboardManager from 'react-native-keyboard-manager';
import {request as loginRequest} from '../../actions/Login';
import {ERROR_NETWORK_NOT_AVAILABLE} from '../../config/WebService';
import {PRIVACY_POLICY} from '../../config/WebService';
import {LoginContext} from '../../';
import {push} from '../../services/NavigationService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      setLogin: this.setLogin,
    };
  }
  componentWillMount() {
    console.log('componentWillMount ****** login');

    Utils.keyboardDismiss();
    // Notification.notificationPermission()
    //   .then(bool => {
    //     console.warn('notificationPermission :', bool);
    //   })
    //   .catch(error => {
    //     console.warn('notificationPermission err :', error);
    //   });
    // Notification.fcmToken(token => {
    //   console.log('token =============', token);
    // });
  }
  setLogin = (isLogin = true) => this.setState({isLogin});
  componentDidMount() {
    if (Platform.OS === 'ios') {
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
    Utils.keyboardDismiss();
    console.log('componentDidMount ******* ');
  }

  onSubmit = (setLogin) => {
    const errors = {};
    let emailValid = true;
    let passwordValid = true;
    ['email', 'password'].forEach((name) => {
      const value = this.state[name];
      if (name === 'password') {
        if (value.length === 0) {
          passwordValid = false;
          errors[name] = Strings.VALIDATION.passwordField;
        } else if (value.length <= 5) {
          passwordValid = false;
          errors[name] = Strings.VALIDATION.password;
        }
      } else if (name === 'email') {
        if (value.length === 0) {
          emailValid = false;
          errors[name] = Strings.VALIDATION.email;
        } else if (!Utils.validateEmail(value)) {
          emailValid = false;
          errors[name] = Strings.VALIDATION.emailError;
        }
      }
    });
    this.setState({errors});

    const {email, password} = this.state;
    if (passwordValid && emailValid) {
      if (this.props.networkInfo) {
        Notification.fcmToken((token) => {
          console.log('token =============', token);
          const payload = {
            email: email,
            password: password,
            role_id: 4,
            device_type: Utils.isPlatformAndroid() ? 'android' : 'ios',
            device_token: token,
          };
          this.props.loginRequest(payload, (data) => {
            console.log('wapis ayaa  : ', data);
            this.setState({email: '', password: ''});
            setLogin();
          });
        });
      } else {
        Utils.MessageAlertError(
          ERROR_NETWORK_NOT_AVAILABLE.title,
          ERROR_NETWORK_NOT_AVAILABLE.message,
        );
      }
    }
  };

  _submitCheck = () => {
    const payload = {
      email: 'zain@mailinator.com',
      password: '1234567',
      role_id: 4,
    };
    console.log('payload : ', payload);
    this.props.loginRequest(payload, (data) => {
      console.log('wapis ayaa  : ', data);
    });
  };

  _onFocus = () => {
    const {errors = {}} = this.state;

    // eslint-disable-next-line
    for (const name in errors) {
      const ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  };

  render() {
    const {email, password, errors} = this.state;
    return (
      <LoginContext.Consumer>
        {({setLogin}) => (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            overScrollMode="always"
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={false}
            ref={(ref) => {
              this.scrollView = ref;
            }}>
            <StatusBar
              backgroundColor={Colors.statusBar.black}
              barStyle="light-content"
            />
            <View style={styles.container}>
              <View
                style={{
                  // backgroundColor: "red",
                  alignItems: 'center',
                  marginHorizontal: Metrics.doubleBaseMargin,
                  paddingTop: 100,
                  paddingBottom: 30,
                }}>
                <AppLogoText />
                <View>
                  <BoldHeading
                    title="Get your ride that matches your style & budget"
                    style={{width: 226, marginTop: 20}}
                  />
                </View>
              </View>
              <TextFieldBorder
                textFieldImage={Images.email}
                placeholder={Strings.PLACEHOLDER.email}
                value={email}
                onChangeText={(email) => this.setState({email})}
                returnKeyType="next"
                onSubmitEditing={() => this.password.focus()}
                reference={(ref) => {
                  this.email = ref;
                }}
                keyboardType="email-address"
                onFocus={this._onFocus}
                error={errors.email}
                textFieldStyle={[
                  styles.emailAddressTextField,
                  {marginTop: Metrics.baseMargin},
                ]}
                autoCapitalize="none"
              />
              <TextFieldBorder
                textFieldImage={Images.key}
                placeholder={'Password'}
                value={password}
                onChangeText={(password) => this.setState({password})}
                returnKeyType="done"
                secureTextEntry
                onSubmitEditing={() => null}
                reference={(ref) => {
                  this.password = ref;
                }}
                onFocus={this._onFocus}
                error={errors.password}
                textFieldStyle={styles.emailAddressTextField}
                autoCapitalize="none"
              />

              <AppButton
                buttonTitle="Log In"
                onPress={() => {
                  this.onSubmit(setLogin);
                }}
                style={{marginTop: Metrics.xDoubleBaseMargin * 2}}
              />

              <ButtonView
                style={[styles.guestContainer, {marginTop: Metrics.baseMargin}]}
                onPress={() => push('forgotPassword')}>
                <Text type="regular" size="small">
                  Forgot your password?
                </Text>
              </ButtonView>
              <ButtonView
                style={styles.guestContainer}
                onPress={() => push('signup')}>
                <Text type="regular" size="small">
                  Don't have an account yet? Register
                </Text>
              </ButtonView>
              <Loading loading={this.props.isFetching} />
            </View>
          </ScrollView>
        )}
      </LoginContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo.isNetworkConnected,
  isFetching: state.user.isFetching,
});

const actions = {loginRequest};

export default connect(mapStateToProps, actions)(Login);
