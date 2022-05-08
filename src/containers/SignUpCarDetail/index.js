// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {
  Text,
  TextFieldBorder,
  ButtonView,
  BoldHeading,
  AppButton,
  Loading,
  ValidationText,
} from '../../components';
import styles from './styles';
import _ from 'lodash';
import Notification from '../../services/Notification';
import MediaPicker from '../../services/MediaPicker';
import Utils from '../../util';
import {Images, Metrics, Fonts, Colors, Strings} from '../../theme';

import {requestCity, request} from '../Signup/SignUpAction';
import {ERROR_NETWORK_NOT_AVAILABLE} from '../../config/WebService';
import {PRIVACY_POLICY, TERM_CONDITION} from '../../config/WebService';
import {DRIVER_ROLE_ID} from '../../constants';
import {push} from '../../services/NavigationService';

const registrationNumberArray = [
  'registrationNumber_front',
  'registrationNumber_back',
];

const insuranseNumberArray = ['insuranseNumber_front', 'insuranseNumber_back'];

class SignUpCarDetail extends Component {
  constructor(props) {
    super(props);
    console.log('signUpHalf  *********** : ', props.navigation.state.params);
    const propsObject = props.navigation.state.params;
    this.state = {
      carMake: '',
      carModalName: '',
      carModalYear: '',
      carColor: '',
      carTransmission: '',
      registrationNumber: '',
      registrationNumberFront: '',
      registrationNumberBack: '',
      registrationNumberFrontResponse: {
        // name: 'file.jpg',
        // type: 'image/jpeg',
        // uri: '',
      },
      registrationNumberBackResponse: {
        // name: 'file.jpg',
        // type: 'image/jpeg',
        // uri: '',
      },
      registrationNumberCardFrontStatus: true,
      registrationNumberCardBackStatus: true,

      // car
      carInsuranseNumber: '',
      carInsuranseNumberFront: '',
      carInsuranseNumberBack: '',
      carInsuranseNumberFrontResponse: {
        // name: 'file.jpg',
        // type: 'image/jpeg',
        // uri: '',
      },
      carInsuranseNumberBackResponse: {
        // name: 'file.jpg',
        // type: 'image/jpeg',
        // uri: '',
      },
      carInsuranseNumberCardFrontStatus: true,
      carInsuranseNumberCardBackStatus: true,
      driverProfileImage:
        propsObject && propsObject.driverProfileImage
          ? propsObject.driverProfileImage
          : '',
      userHalfData:
        propsObject && propsObject.userHalfObject
          ? propsObject.userHalfObject
          : {},
      errors: {},
    };
  }

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

  _renderDriverProfile = () => {
    const {driverProfileImage} = this.state;
    const profileStyle = {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderColor: 'red',
      borderWidth: 3,
    };
    const profileStyleing = !_.isEmpty(driverProfileImage)
      ? profileStyle
      : null;
    const imageValidation = !_.isEmpty(driverProfileImage)
      ? 'Insert Image Please'
      : 'Your image';
    return (
      <View>
        <Image
          source={
            !_.isEmpty(driverProfileImage)
              ? driverProfileImage
              : Images.image_holder
          }
          resizeMode="cover"
          style={{
            marginVertical: Metrics.smallMargin,
            width: 100,
            height: 100,
            borderRadius: 50,
            // borderColor: "red",
          }}
        />
        <Text
          style={{textAlign: 'center'}}
          type="medium"
          size="small"
          color="white">
          Your image
        </Text>
      </View>
    );
  };

  _imagePicker = (data) => {
    MediaPicker.showImagePicker((response) => {
      const {
        registrationNumberFront,
        registrationNumberBack,
        carInsuranseNumberFront,
        carInsuranseNumberBack,
      } = this.state;
      if (response.uri) {
        if (data == registrationNumberArray[0]) {
          const registrationNumberFrontImage = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };
          const registrationNumberFrontFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            // name: response.fileName,
            uri: response.uri,
          };

          this.setState({
            registrationNumberFront: registrationNumberFrontImage,
            registrationNumberFrontResponse: registrationNumberFrontFile,
            registrationNumberCardFrontStatus: false,
          });
        } else if (data == registrationNumberArray[1]) {
          const drivingLicenseBackImage = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };
          const registrationNumberBackFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            // name: response.fileName,
            uri: response.uri,
          };
          this.setState({
            registrationNumberBack: drivingLicenseBackImage,
            registrationNumberBackResponse: registrationNumberBackFile,
            registrationNumberCardBackStatus: false,
          });
        } else if (data == insuranseNumberArray[0]) {
          const carInsuranseNumberFrontImage = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };
          const carInsuranseNumberFrontFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            // name: response.fileName,
            uri: response.uri,
          };

          this.setState({
            carInsuranseNumberFront: carInsuranseNumberFrontImage,
            carInsuranseNumberFrontResponse: carInsuranseNumberFrontFile,
            carInsuranseNumberCardFrontStatus: false,
          });
        } else if (data == insuranseNumberArray[1]) {
          const carInsuranseNumberBackImage = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };
          const carInsuranseNumberBackFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            // name: response.fileName,
            uri: response.uri,
          };
          this.setState({
            carInsuranseNumberBack: carInsuranseNumberBackImage,
            carInsuranseNumberBackResponse: carInsuranseNumberBackFile,
            carInsuranseNumberCardBackStatus: false,
          });
        }
      } // end of response uri if
    });
  };

  _renderCarDetail = () => {
    const {
      carMake,
      carModalName,
      carModalYear,
      carColor,
      carTransmission,
      errors,
    } = this.state;

    return (
      <View>
        <TextFieldBorder
          textFieldImage={Images.car}
          placeholder={'Car Make'}
          value={carMake}
          onChangeText={(carMake) => this.setState({carMake})}
          returnKeyType="next"
          onSubmitEditing={() => this.carModalName.focus()}
          reference={(ref) => {
            this.carMake = ref;
          }}
          onFocus={this._onFocus}
          error={errors.carMake}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
        <TextFieldBorder
          textFieldImage={Images.car}
          placeholder={'Car Model Name'}
          value={carModalName}
          onChangeText={(carModalName) => this.setState({carModalName})}
          returnKeyType="next"
          onSubmitEditing={() => this.carModalYear.focus()}
          reference={(ref) => {
            this.carModalName = ref;
          }}
          onFocus={this._onFocus}
          error={errors.carModalName}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
        <TextFieldBorder
          textFieldImage={Images.car}
          placeholder={'Car Model Year'}
          value={carModalYear}
          onChangeText={(carModalYear) => this.setState({carModalYear})}
          returnKeyType="next"
          onSubmitEditing={() => this.carColor.focus()}
          reference={(ref) => {
            this.carModalYear = ref;
          }}
          onFocus={this._onFocus}
          error={errors.carModalYear}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
        <TextFieldBorder
          textFieldImage={Images.car}
          placeholder={'Car Color'}
          value={carColor}
          onChangeText={(carColor) => this.setState({carColor})}
          returnKeyType="next"
          // onSubmitEditing={() => this.carTransmission.focus()}
          onSubmitEditing={() => null}
          reference={(ref) => {
            this.carColor = ref;
          }}
          onFocus={this._onFocus}
          error={errors.carColor}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
        {/* <TextFieldBorder
          textFieldImage={Images.car}
          placeholder={'Car Transmission'}
          value={carTransmission}
          onChangeText={carTransmission => this.setState({carTransmission})}
          // returnKeyType="next"
          // onSubmitEditing={() => this.lastName.focus()}
          reference={ref => {
            this.carTransmission = ref;
          }}
          onFocus={this._onFocus}
          error={errors.carTransmission}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        /> */}
        <Loading loading={this.props.isFetching} />
      </View>
    );
  };

  _renderSectionHeading = (title) => {
    return (
      <View
        style={{
          width: Metrics.screenWidth - Metrics.ratio(100),
          paddingVertical: Metrics.baseMargin,
        }}>
        <Text type="regular" size="large">
          {title}
        </Text>
      </View>
    );
  };

  _renderImageBackgroundPlaceholder = (title, onPress, data) => {
    const {
      registrationNumberFront,
      registrationNumberBack,
      registrationNumberCardFrontStatus,
      registrationNumberCardBackStatus,

      carInsuranseNumberFront,
      carInsuranseNumberBack,
      carInsuranseNumberCardFrontStatus,
      carInsuranseNumberCardBackStatus,
    } = this.state;

    const registrationNumberFrontParam =
      _.isEmpty(registrationNumberFront) && data == registrationNumberArray[0];
    const registrationNumberBackParam =
      _.isEmpty(registrationNumberBack) && data == registrationNumberArray[1];

    const carInsuranseNumberCardFrontParam =
      _.isEmpty(carInsuranseNumberFront) && data == insuranseNumberArray[0];

    const carInsuranseNumberCardBackParam =
      _.isEmpty(carInsuranseNumberBack) && data == insuranseNumberArray[1];

    return (
      <ButtonView
        onPress={onPress}
        style={{
          flex: 1,
        }}>
        <ImageBackground
          source={Images.cardImagePlaceholder}
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="stretch">
          <View>
            <Text type="regular" size="small" style={{textAlign: 'center'}}>
              {title}
            </Text>
          </View>
        </ImageBackground>
        {!registrationNumberCardFrontStatus && registrationNumberFrontParam ? (
          <ValidationText text={Strings.VALIDATION.cardImageValidation} />
        ) : null}
        {!registrationNumberCardBackStatus && registrationNumberBackParam ? (
          <ValidationText text={Strings.VALIDATION.cardImageValidation} />
        ) : null}

        {!carInsuranseNumberCardFrontStatus &&
        carInsuranseNumberCardFrontParam ? (
          <ValidationText text={Strings.VALIDATION.cardImageValidation} />
        ) : null}

        {!carInsuranseNumberCardBackStatus &&
        carInsuranseNumberCardBackParam ? (
          <ValidationText text={Strings.VALIDATION.cardImageValidation} />
        ) : null}
      </ButtonView>
    );
  };
  _renderCardImage = (image, onPress) => {
    return (
      <ButtonView
        onPress={onPress}
        style={{
          flex: 1,
        }}>
        <Image
          source={image}
          style={{
            height: 71,
            margin: 5,
          }}
        />
      </ButtonView>
    );
  };

  _renderImagePlaceholder = (title, onPress, data) => {
    const {
      registrationNumberFront,
      registrationNumberBack,
      carInsuranseNumberFront,
      carInsuranseNumberBack,
    } = this.state;

    if (
      !_.isEmpty(registrationNumberFront) &&
      data == registrationNumberArray[0]
    ) {
      return this._renderCardImage(registrationNumberFront, onPress);
    }
    if (
      !_.isEmpty(registrationNumberBack) &&
      data == registrationNumberArray[1]
    ) {
      return this._renderCardImage(registrationNumberBack, onPress);
    }
    if (
      !_.isEmpty(carInsuranseNumberFront) &&
      data == insuranseNumberArray[0]
    ) {
      return this._renderCardImage(carInsuranseNumberFront, onPress);
    }
    if (!_.isEmpty(carInsuranseNumberBack) && data == insuranseNumberArray[1]) {
      return this._renderCardImage(carInsuranseNumberBack, onPress);
    } else {
      return this._renderImageBackgroundPlaceholder(title, onPress, data);
    }
  };
  _renderCarRegistration = () => {
    const {registrationNumber, errors, email} = this.state;
    return (
      <View>
        {this._renderSectionHeading('Car Registration')}
        {/*<TextFieldBorder
          placeholder={'Registration Number'}
          value={registrationNumber}
          onChangeText={registrationNumber =>
            this.setState({registrationNumber})
          }
          returnKeyType="next"
          // onSubmitEditing={() => this.email.focus()}
          reference={ref => {
            this.registrationNumber = ref;
          }}
          // keyboardType="number-pad"
          onFocus={this._onFocus}
          error={errors.registrationNumber}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        /> */}
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: "space-between",
            // backgroundColor: "red",
            alignItems: 'center',
            width: Metrics.screenWidth - Metrics.ratio(100),
          }}>
          {this._renderImagePlaceholder(
            'Front',
            () => {
              this._imagePicker(registrationNumberArray[0]);
            },
            registrationNumberArray[0],
          )}
          {/*this._renderImagePlaceholder(
            "Back",
            () => {
              this._imagePicker(registrationNumberArray[1]);
            },
            registrationNumberArray[1]
          )*/}
        </View>
      </View>
    );
  };

  _renderCarInsurance = () => {
    const {carInsuranseNumber, errors, email} = this.state;
    return (
      <View>
        {this._renderSectionHeading('Car Insurance')}
        {/*<TextFieldBorder
          placeholder={'Insurance Number'}
          value={carInsuranseNumber}
          onChangeText={carInsuranseNumber =>
            this.setState({carInsuranseNumber})
          }
          returnKeyType="next"
          // onSubmitEditing={() => this.email.focus()}
          reference={ref => {
            this.carInsuranseNumber = ref;
          }}
          // keyboardType="number-pad"
          onFocus={this._onFocus}
          error={errors.carInsuranseNumber}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        /> */}
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: "space-between",
            // backgroundColor: "red",
            alignItems: 'center',
            width: Metrics.screenWidth - Metrics.ratio(100),
          }}>
          {this._renderImagePlaceholder(
            'Front',
            () => {
              this._imagePicker(insuranseNumberArray[0]);
            },
            insuranseNumberArray[0],
          )}
          {/*this._renderImagePlaceholder(
            "Back",
            () => {
              this._imagePicker(insuranseNumberArray[1]);
            },
            insuranseNumberArray[1]
          )*/}
        </View>
      </View>
    );
  };

  _submitSignUpForm = () => {
    const formData = new FormData();

    const {userHalfData} = this.state;
    const errors = {};

    const {
      carMake,
      carModalName,
      carModalYear,
      carColor,
      carTransmission,
      registrationNumber,
      registrationNumberFrontResponse,
      registrationNumberBackResponse,
      registrationNumberCardFrontStatus,
      registrationNumberCardBackStatus,

      carInsuranseNumber,
      carInsuranseNumberFrontResponse,
      carInsuranseNumberBackResponse,
      carInsuranseNumberCardFrontStatus,
      carInsuranseNumberCardBackStatus,
    } = this.state;
    // console.log(
    //   "userHalfData variable : ",
    //   userHalfData,
    //   "userHalfData : ",
    //   userHalfData.address
    // );
    let carMakeValid = true;
    let carModalNameValid = true;
    let carModalYearValid = true;
    let carColorValid = true;
    // let carTransmissionValid = true;
    // let registrationNumberValid = true;
    let registrationNumberFrontValid = true;
    let registrationNumberBackValid = true;

    // let carInsuranseNumberValid = true;
    let carInsuranseNumberFrontValid = true;
    let carInsuranseNumberBackValid = true;
    [
      'carMake',
      'carModalName',
      'carModalYear',
      'carColor',
      // 'carTransmission',
      // 'registrationNumber',
      // 'carInsuranseNumber',
    ].forEach((name) => {
      const value = this.state[name];
      if (name === 'carMake') {
        if (value.length === 0) {
          carMakeValid = false;
          errors[name] = Strings.VALIDATION.carMake;
        }
      } else if (name === 'carModalName') {
        if (value.length === 0) {
          carModalNameValid = false;
          errors[name] = Strings.VALIDATION.carModalName;
        }
      } else if (name === 'carModalYear') {
        if (value.length === 0) {
          carModalYearValid = false;
          errors[name] = Strings.VALIDATION.carModalYear;
        }
      } else if (name === 'carColor') {
        if (value.length === 0) {
          carColorValid = false;
          errors[name] = Strings.VALIDATION.carColor;
        }
      }
      // else if (name === 'carTransmission') {
      //   if (value.length === 0) {
      //     carTransmissionValid = false;
      //     errors[name] = Strings.VALIDATION.carTransmission;
      //   }
      // }
      // else if (name === 'registrationNumber') {
      //   if (value.length === 0) {
      //     registrationNumberValid = false;
      //     errors[name] = Strings.VALIDATION.registrationNumber;
      //   }
      // }
      //  else if (name === 'carInsuranseNumber') {
      //   if (value.length === 0) {
      //     carInsuranseNumberValid = false;
      //     errors[name] = Strings.VALIDATION.carInsuranseNumber;
      //   }
      // }
    });

    // if (
    //   _.isEmpty(registrationNumberFrontResponse) &&
    //   registrationNumberCardFrontStatus
    // ) {
    //   this.setState({registrationNumberCardFrontStatus: false});
    //   registrationNumberFrontValid = false;
    // }
    // if (
    //   _.isEmpty(registrationNumberBackResponse) &&
    //   registrationNumberCardBackStatus
    // ) {
    //   this.setState({registrationNumberCardBackStatus: false});
    //   registrationNumberBackValid = false;
    // }

    // if (
    //   _.isEmpty(carInsuranseNumberFrontResponse) &&
    //   carInsuranseNumberCardFrontStatus
    // ) {
    //   this.setState({carInsuranseNumberCardFrontStatus: false});
    //   carInsuranseNumberFrontValid = false;
    // }
    // if (
    //   _.isEmpty(carInsuranseNumberBackResponse) &&
    //   carInsuranseNumberCardBackStatus
    // ) {
    //   this.setState({carInsuranseNumberCardBackStatus: false});
    //   carInsuranseNumberBackValid = false;
    // }

    this.setState({errors});

    if (
      carMakeValid &&
      carModalNameValid &&
      carModalYearValid &&
      carColorValid
    ) {
      const payload = {
        ...userHalfData,
        car_make: carMake,
        car_model_name: carModalName,
        car_model_year: +carModalYear,
        car_color: carColor,
        car_transmission: carTransmission,
        car_registration_number: +registrationNumber,
        car_registration_number_img_front: registrationNumberFrontResponse,
        car_registration_number_img_back: registrationNumberBackResponse,

        car_insurance_number: +carInsuranseNumber,
        car_insurance_number_img_front: carInsuranseNumberFrontResponse,
        car_insurance_number_img_back: carInsuranseNumberBackResponse,
        device_type: Utils.isPlatformAndroid ? 'android' : 'ios',
        device_token: '8989898',
        country_id: '1',
        role_id: DRIVER_ROLE_ID,
      };

      console.log(
        'userHalfData.social_security_number : ',
        userHalfData.social_security_number,
      );
      formData.append('image_url', userHalfData.image_url);
      formData.append('first_name', userHalfData.first_name);
      formData.append('last_name', userHalfData.last_name);
      formData.append('mobile_no', userHalfData.mobile_no);
      formData.append('email', userHalfData.email);
      formData.append('password', userHalfData.password);
      formData.append('dob', userHalfData.dob);
      // formData.append('license_number', userHalfData.license_number);
      if (!_.isEmpty(userHalfData.license_number_image_front)) {
        formData.append(
          'license_number_image_front',
          userHalfData.license_number_image_front,
        );
      }

      // formData.append(
      //   "license_number_image_back",
      //   userHalfData.license_number_image_back
      // );

      // formData.append(
      //   'insurance_card_number',
      //   userHalfData.insurance_card_number,
      // );
      if (!_.isEmpty(userHalfData.insurance_card_image_front)) {
        formData.append(
          'insurance_card_image_front',

          userHalfData.insurance_card_image_front,
        );
      }

      // formData.append(
      //   "insurance_card_image_back",
      //   userHalfData.insurance_card_image_back
      // );
      formData.append(
        'social_security_number',
        userHalfData.social_security_number,
      );
      // formData.append(
      //   "social_security_image_front",
      //   userHalfData.social_security_image_front
      // );
      // formData.append(
      //   "social_security_image_back",
      //   userHalfData.social_security_image_back
      // );
      formData.append('state_id', userHalfData.state_id + '');
      formData.append('city_id', userHalfData.city_id + '');
      formData.append('address', userHalfData.address);
      formData.append('car_make', carMake);
      formData.append('car_model_name', carModalName);
      formData.append('car_model_year', carModalYear);
      formData.append('car_color', carColor);
      // formData.append('car_transmission', carTransmission);
      // formData.append('car_registration_number', registrationNumber);

      if (!_.isEmpty(registrationNumberFrontResponse)) {
        formData.append(
          'car_registration_number_img_front',
          registrationNumberFrontResponse,
        );
      }

      // formData.append(
      //   "car_registration_number_img_back",
      //   registrationNumberBackResponse
      // );
      formData.append('vehicle_type_id', 1);
      // formData.append('car_insurance_number', carInsuranseNumber);

      if (!_.isEmpty(carInsuranseNumberFrontResponse)) {
        formData.append(
          'car_insurance_number_img_front',

          carInsuranseNumberFrontResponse,
        );
      }

      // formData.append(
      //   "car_insurance_number_img_back",
      //   carInsuranseNumberBackResponse
      // );
      formData.append(
        'device_type',
        Utils.isPlatformAndroid() ? 'android' : 'ios',
      );

      formData.append('country_id', '1');
      formData.append('role_id', DRIVER_ROLE_ID);

      if (this.props.networkInfo) {
        Notification.fcmToken((token) => {
          formData.append('device_token', token);
          this.props.request(formData);
        });
      } else {
        Utils.MessageAlertError(
          ERROR_NETWORK_NOT_AVAILABLE.title,
          ERROR_NETWORK_NOT_AVAILABLE.message,
        );
      }
    }
  };
  render() {
    const {carMake, errors} = this.state;

    return (
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
              paddingVertical: Metrics.baseMargin,
              // backgroundColor: "red"
            }}>
            <BoldHeading
              title="Car Details"
              style={{fontSize: Fonts.size.xLarge, marginBottom: 5}}
            />
            <Text
              style={{textAlign: 'center'}}
              type="medium"
              size="small"
              color="white">
              Enter your details to signup
            </Text>
          </View>

          {this._renderDriverProfile()}
          {this._renderCarDetail()}

          {this._renderCarRegistration()}
          {this._renderCarInsurance()}

          <View
            style={{
              paddingVertical: Metrics.baseMargin,
              marginHorizontal: Metrics.xDoubleBaseMargin,
            }}
            onPress={() => null}>
            <Text
              type="regular"
              size="small"
              color="primary"
              onPress={() => null}>
              By creating an account you agree to the{' '}
              <Text
                onPress={() => {
                  push('webView', {
                    websiteUrl: TERM_CONDITION,
                    title: 'Terms & Conditions',
                  });
                }}
                style={{
                  textDecorationLine: 'underline',
                }}>
                terms{' '}
              </Text>
              of use &{' '}
              <Text
                onPress={() => {
                  push('webView', {
                    websiteUrl: PRIVACY_POLICY,
                    title: 'Privacy Policy',
                  });
                }}
                style={{
                  textDecorationLine: 'underline',
                }}>
                {' '}
                privacy policy.
              </Text>
            </Text>
          </View>

          <AppButton
            style={{marginTop: Metrics.baseMargin}}
            buttonTitle="Register"
            onPress={() => {
              // alert("");
              this._submitSignUpForm();
              console.log(
                'userHalfData *** button : ',
                this.state.userHalfData,
              );
            }}
          />

          <ButtonView
            style={{paddingVertical: Metrics.baseMargin}}
            onPress={() => push('login')}>
            <Text type="regular" size="small">
              Already have an account? <Text>Log In</Text>
            </Text>
          </ButtonView>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo.isNetworkConnected,
  stateData: state.SignUpReducer.sateData,
  cityData: state.SignUpReducer.cityData,
  isFetching: state.SignUpReducer.isFetching,
});

const actions = {request};

export default connect(mapStateToProps, actions)(SignUpCarDetail);
