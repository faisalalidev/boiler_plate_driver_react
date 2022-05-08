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
} from 'react-native';

// import DatePicker from "react-native-datepicker";
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import {requestState, requestCity} from './SignUpAction';

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
  CustomHeader,
  AppButton,
  ValidationText,
  // ModalDropDown
} from '../../components';
import styles from './styles';
import Utils from '../../util';
import MediaPicker from '../../services/MediaPicker';

// import ModalPicker from "react-native-modal-picker";
import ModalSelector from 'react-native-modal-selector';
import _ from 'lodash';
import {push} from '../../services/NavigationService';

const driverProfile = ['driverProfileImage'];
const drivingLicense = ['license_front', 'license_back'];
const SocialSecurity = ['SocialSecurityCard_Front', 'SocialSecurityCard_Back'];
const InsuranceCardImage = ['InsuranceCard_Front', 'InsuranceCard_Back'];

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      // date: null,
      date: '',
      password: '',
      licenseNumber: '',
      insuranceNumber: '',
      socialSecurityNumber: '',
      address: '',
      // drivingLicense
      drivingLicenseFront: '',
      drivingLicenseBack: '',
      drivingLicenseFrontResponse: {},
      drivingLicenseBackResponse: {},
      drivingLicenseFrontStatus: true,
      drivingLicenseBackStatus: true,
      // insurance
      insuranceCardFront: '',
      insuranceCardFrontResponse: {},
      insuranceCardBackResponse: {},
      insuranceCardBack: '',
      insuranceCardFrontStatus: true,
      insuranceCardBackStatus: true,

      // socialSecurity
      socialSecurityFrontResponse: {},
      socialSecurityBackResponse: {},
      socialSecurityFront: '',
      socialSecurityBack: '',
      socialSecurityFrontStatus: true,
      socialSecurityBackStatus: true,

      // driver profile
      driverProfileImageResponse: {},
      driverProfileImage: '',
      driverProfileImageStatus: true,
      isDateTimePickerVisible: false,
      textInputStateValue: '',
      textInputStateId: '',
      stateDateModal: !_.isEmpty(props.stateData) ? props.stateData : [],
      textInputCityValue: '',
      textInputCityId: '',
      cityDateModal: !_.isEmpty(props.cityData) ? props.cityData : [],
      errors: {},
    };

    console.log('props const : ', props);
  }

  componentWillMount() {
    Utils.keyboardDismiss();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps willRe', nextProps);
    const newstateData = !_.isEmpty(nextProps.stateData)
      ? nextProps.stateData
      : [];
    const newcityData = !_.isEmpty(nextProps.cityData)
      ? nextProps.cityData
      : [];
    this.setState({stateDateModal: newstateData, cityDateModal: newcityData});
  }

  componentDidMount() {
    Utils.keyboardDismiss();
    const payload = {
      id: 254, // united state ID
    };
    this.props.requestState(payload);
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

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = (date) => {
    const dateConvert = moment(date).format('YYYY/MM/DD');

    this.setState({date: dateConvert});
    this._hideDateTimePicker();
  };

  _renderDatePicker = () => {
    return (
      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
        maximumDate={
          new Date(new Date().setFullYear(new Date().getFullYear() - 18))
        }
      />
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
      drivingLicenseFront,
      drivingLicenseBack,
      drivingLicenseFrontResponse,
      drivingLicenseBackResponse,
      drivingLicenseFrontStatus,
      drivingLicenseBackStatus,

      insuranceCardFront,
      insuranceCardBack,
      insuranceCardFrontStatus,
      insuranceCardBackStatus,

      socialSecurityFront,
      socialSecurityBack,
      socialSecurityFrontStatus,
      socialSecurityBackStatus,
    } = this.state;

    const drivingLicenseFrontParam =
      _.isEmpty(drivingLicenseFront) && data == drivingLicense[0];

    const drivingLicenseBackImageParam =
      _.isEmpty(drivingLicenseBack) && data == drivingLicense[1];

    const insuranceCardFrontImageParam =
      _.isEmpty(insuranceCardFront) && data == InsuranceCardImage[0];

    const insuranceCardBackImageParam =
      _.isEmpty(insuranceCardBack) && data == InsuranceCardImage[1];

    const socialSecurityFrontImageParam =
      _.isEmpty(socialSecurityFront) && data == SocialSecurity[0];
    const socialSecurityBackImageParam =
      _.isEmpty(socialSecurityBack) && data == SocialSecurity[1];

    // image validate
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
        {!drivingLicenseFrontStatus && drivingLicenseFrontParam ? (
          <ValidationText text={Strings.VALIDATION.cardImageValidation} />
        ) : null}
        {!drivingLicenseBackStatus && drivingLicenseBackImageParam ? (
          <ValidationText text={Strings.VALIDATION.cardImageValidation} />
        ) : null}

        {!insuranceCardFrontStatus && insuranceCardFrontImageParam ? (
          <ValidationText text={Strings.VALIDATION.cardImageValidation} />
        ) : null}
        {!insuranceCardBackStatus && insuranceCardBackImageParam ? (
          <ValidationText text={Strings.VALIDATION.cardImageValidation} />
        ) : null}

        {!socialSecurityFrontStatus && socialSecurityFrontImageParam ? (
          <ValidationText text={Strings.VALIDATION.cardImageValidation} />
        ) : null}
        {!socialSecurityBackStatus && socialSecurityBackImageParam ? (
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
      drivingLicenseFront,
      drivingLicenseBack,
      insuranceCardFront,
      insuranceCardBack,
      // socialSecurityFront,
      // socialSecurityBack
    } = this.state;

    const drivingLicenseFrontParam =
      _.isEmpty(drivingLicenseFront) && data == drivingLicense[0];
    if (!_.isEmpty(drivingLicenseFront) && data == drivingLicense[0]) {
      return this._renderCardImage(drivingLicenseFront, onPress);
    }
    if (!_.isEmpty(drivingLicenseBack) && data == drivingLicense[1]) {
      return this._renderCardImage(drivingLicenseBack, onPress);
    }
    if (!_.isEmpty(insuranceCardFront) && data == InsuranceCardImage[0]) {
      return this._renderCardImage(insuranceCardFront, onPress);
    }
    if (!_.isEmpty(insuranceCardBack) && data == InsuranceCardImage[1]) {
      return this._renderCardImage(insuranceCardBack, onPress);
    }

    // if (!_.isEmpty(socialSecurityFront) && data == SocialSecurity[0]) {
    //   return this._renderCardImage(socialSecurityFront, onPress);
    // }
    // if (!_.isEmpty(socialSecurityBack) && data == SocialSecurity[1]) {
    //   return this._renderCardImage(socialSecurityBack, onPress);
    // }
    else {
      return this._renderImageBackgroundPlaceholder(title, onPress, data);
    }
  };

  _renderInsuranceCardMainView = () => {
    const {insuranceNumber, errors} = this.state;
    return (
      <View>
        {this._renderSectionHeading('Insurance Card')}
        {/*<TextFieldBorder
          placeholder={'Insurance Card Number'}
          value={insuranceNumber}
          onChangeText={insuranceNumber => this.setState({insuranceNumber})}
          returnKeyType="next"
          // onSubmitEditing={() => this.email.focus()}
          reference={ref => {
            this.insuranceNumber = ref;
          }}
          // keyboardType="number-pad"
          onFocus={this._onFocus}
          error={errors.insuranceNumber}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: Metrics.screenWidth - Metrics.ratio(100),
          }}>
          {this._renderImagePlaceholder(
            'Front',
            () => this._imagePicker(InsuranceCardImage[0]),
            InsuranceCardImage[0],
          )}
          {/*this._renderImagePlaceholder(
            "Back",
            () => this._imagePicker(InsuranceCardImage[1]),
            InsuranceCardImage[1]
          )*/}
        </View>
      </View>
    );
  };

  _renderSocialSecuityContainer = () => {
    const {socialSecurityNumber, errors} = this.state;
    return (
      <View>
        {this._renderSectionHeading('Social Security Card')}
        <TextFieldBorder
          placeholder={'Social Card Number'}
          value={socialSecurityNumber}
          onChangeText={(socialSecurityNumber) =>
            this.setState({socialSecurityNumber})
          }
          returnKeyType="next"
          // onSubmitEditing={() => this.email.focus()}
          reference={(ref) => {
            this.socialSecurityNumber = ref;
          }}
          // keyboardType="number-pad"
          onFocus={this._onFocus}
          error={errors.socialSecurityNumber}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />

        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: Metrics.screenWidth - Metrics.ratio(100)
          }}
        >
          {this._renderImagePlaceholder(
            "Front",
            () => {
              this._imagePicker(SocialSecurity[0]);
            },
            SocialSecurity[0]
          )}
          {this._renderImagePlaceholder(
            "Back",
            () => {
              this._imagePicker(SocialSecurity[1]);
            },
            SocialSecurity[1]
          )}
        </View> 
          */}
      </View>
    );
  };

  _imagePicker = (data) => {
    MediaPicker.showImagePicker((response) => {
      console.log(' showImagePicker response : ', response);
      const {drivingLicenseFront, drivingLicenseBack} = this.state;
      if (response.uri) {
        if (data == driverProfile[0]) {
          const driverProfile = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };
          const driverFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            // name: response.fileName,
            uri: response.uri,
          };
          console.log('Driver File  : ', driverFile);
          this.setState({
            driverProfileImage: driverProfile,
            driverProfileImageResponse: driverFile,
            driverProfileImageStatus: false, // validation pursose
          });
        } else if (data == drivingLicense[0]) {
          const drivingLicenseFrontImage = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };
          const drivingLicenseFrontImageFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            uri: response.uri,
          };
          this.setState({
            drivingLicenseFront: drivingLicenseFrontImage,
            drivingLicenseFrontResponse: drivingLicenseFrontImageFile,
            drivingLicenseFrontStatus: false,
          });
        } else if (data == drivingLicense[1]) {
          const drivingLicenseBackImage = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };
          const drivingLicenseBackImageFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            // name: response.fileName,
            uri: response.uri,
          };
          this.setState({
            drivingLicenseBack: drivingLicenseBackImage,
            drivingLicenseBackResponse: drivingLicenseBackImageFile,
            drivingLicenseBackStatus: false,
          });
        } else if (data == InsuranceCardImage[0]) {
          const InsuranceCardFrontImage = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };
          const InsuranceCardFrontImageFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            // name: response.fileName,
            uri: response.uri,
          };

          this.setState({
            insuranceCardFront: InsuranceCardFrontImage,
            insuranceCardFrontResponse: InsuranceCardFrontImageFile,
            insuranceCardFrontStatus: false,
          });
        } else if (data == InsuranceCardImage[1]) {
          const InsuranceCardBackImage = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };

          const InsuranceCardBackImageFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            // name: response.fileName,
            uri: response.uri,
          };

          this.setState({
            insuranceCardBack: InsuranceCardBackImage,
            insuranceCardBackResponse: InsuranceCardBackImageFile,
            insuranceCardBackStatus: false,
          });
        }
        // else if (data == SocialSecurity[0]) {
        //   const SocialSecurityCardFrontImage = {
        //     uri: "data:image/jpeg;base64," + response.data
        //   };

        //   const SocialSecurityCardFrontImageFile = {
        //     type: "image/jpeg", //response.type
        //     name: "file.jpg",
        //     // name: response.fileName,
        //     uri: response.uri
        //   };

        //   this.setState({
        //     socialSecurityFront: SocialSecurityCardFrontImage,
        //     socialSecurityFrontResponse: SocialSecurityCardFrontImageFile,
        //     socialSecurityFrontStatus: false
        //   });
        // } else if (data == SocialSecurity[1]) {
        //   const SocialSecurityCardBackImage = {
        //     uri: "data:image/jpeg;base64," + response.data
        //   };

        //   const SocialSecurityCardBackImageFile = {
        //     type: "image/jpeg", //response.type
        //     name: "file.jpg",
        //     // name: response.fileName,
        //     uri: response.uri
        //   };

        //   this.setState({
        //     socialSecurityBack: SocialSecurityCardBackImage,
        //     socialSecurityBackResponse: SocialSecurityCardBackImageFile,
        //     socialSecurityBackStatus: false
        //   });
        // }
      } // end of response uri if
    });
  };

  // ******* driving license section
  _renderDrivingLicense = () => {
    const {licenseNumber, errors, email} = this.state;
    return (
      <View>
        {this._renderSectionHeading('Driving License')}
        {/*<TextFieldBorder
          placeholder={'License Number'}
          value={licenseNumber}
          onChangeText={licenseNumber => this.setState({licenseNumber})}
          returnKeyType="next"
          // onSubmitEditing={() => this.email.focus()}
          reference={ref => {
            this.licenseNumber = ref;
          }}
          // keyboardType="number-pad"
          onFocus={this._onFocus}
          error={errors.licenseNumber}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: Metrics.screenWidth - Metrics.ratio(100),
          }}>
          {this._renderImagePlaceholder(
            'Front',
            () => {
              this._imagePicker(drivingLicense[0]);
            },
            drivingLicense[0],
          )}
          {/*this._renderImagePlaceholder(
            "Back",
            () => {
              this._imagePicker(drivingLicense[1]);
            },
            drivingLicense[1]
          )*/}
        </View>
      </View>
    );
  };

  _renderDriverProfile = () => {
    const {driverProfileImage, driverProfileImageStatus} = this.state;
    const profileStyle = {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderColor: 'red',
      borderWidth: 3,
    };

    const imageValidation =
      _.isEmpty(driverProfileImage) && !driverProfileImageStatus
        ? 'Please insert image'
        : '';

    return (
      <ButtonView
        onPress={() => this._imagePicker(driverProfile[0])}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
            }}
          />
          <Image
            source={Images.plus}
            resizeMode="contain"
            style={{
              position: 'absolute',
              bottom: 5,
              right: 0,
            }}
          />
        </View>
        <Text
          style={{textAlign: 'center'}}
          type="medium"
          size="small"
          color="white">
          Your image
        </Text>

        {_.isEmpty(driverProfileImage) && !driverProfileImageStatus ? (
          <ValidationText text={Strings.VALIDATION.driverImage} />
        ) : null}
      </ButtonView>
    );
  };

  _renderStateModal = (stateData) => {
    console.log('_renderStateModal : ', stateData);
    return <View />;
  };

  _submitHalfSignUpForm = () => {
    const {
      //driver profile
      driverProfileImageResponse,
      driverProfileImage,
      driverProfileImageStatus,

      firstName,
      lastName,
      phoneNumber,
      email,
      date,
      password,
      licenseNumber,
      drivingLicenseFront,
      drivingLicenseBack,
      drivingLicenseFrontResponse,
      drivingLicenseBackResponse,
      drivingLicenseFrontStatus,
      drivingLicenseBackStatus,

      // insuranceNumber,
      insuranceCardFront,
      insuranceCardBack,
      insuranceCardFrontResponse,
      insuranceCardBackResponse,
      insuranceCardFrontStatus,
      insuranceCardBackStatus,

      socialSecurityNumber,
      // socialSecurityFront,
      // socialSecurityBack,
      // socialSecurityFrontResponse,
      // socialSecurityBackResponse,
      // socialSecurityFrontStatus,
      // socialSecurityBackStatus,

      textInputStateValue,
      textInputStateId,
      textInputCityValue,
      textInputCityId,
      address,
    } = this.state;

    const errors = {};
    let driverProfileImageStatusValid = true;
    let firstNameValid = true;
    let lastNameValid = true;
    let phoneNumberValid = true;
    // let dateValid = true;
    let emailValid = true;

    let passwordValid = true;
    // let licenseNumberValid = true;
    let licenseNumberFrontValid = true;
    let licenseNumberBackValid = true;

    // let insuranceNumberValid = true;
    let insuranceNumberFrontValid = true;
    let insuranceNumberBackValid = true;

    let socialSecurityNumberValid = true;
    // let socialSecurityFrontValid = true;
    // let socialSecurityBackValid = true;
    let addressValid = true;
    let textInputStateValueValid = true;
    let textInputCityValueValid = true;

    [
      'firstName',
      'lastName',
      'phoneNumber',
      'email',
      // 'date',
      'password',
      // 'licenseNumber',
      // 'insuranceNumber',
      // 'socialSecurityNumber',
      'textInputStateValue',
      'textInputCityValue',
      'address',
    ].forEach((name) => {
      const value = this.state[name];
      // if (name === "driverImage") {
      //   if (!driverProfileImageStatus) {
      //     driverProfileImageStatusValid = false;
      //     // errors[name] = Strings.VALIDATION.password;
      //   }
      // }
      if (name === 'password') {
        if (value.length == 0) {
          passwordValid = false;
          errors[name] = Strings.VALIDATION.passwordField;
        } else if (value.length <= 5) {
          passwordValid = false;
          errors[name] = Strings.VALIDATION.password;
        }
      } else if (name === 'phoneNumber') {
        if (value.length === 0) {
          phoneNumberValid = false;
          errors[name] = Strings.VALIDATION.phoneNumber;
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
      // else if (name === 'date') {
      //   if (_.isEmpty(date)) {
      //     dateValid = false;
      //     errors[name] = Strings.VALIDATION.date;
      //   }
      //   // dateValid = true;
      // }
      else if (name === 'firstName') {
        if (value.length === 0) {
          firstNameValid = false;
          errors[name] = Strings.VALIDATION.firstName;
        }
      } else if (name === 'lastName') {
        if (value.length === 0) {
          lastNameValid = false;
          errors[name] = Strings.VALIDATION.lastName;
        }
      }
      // else if (name === 'licenseNumber') {
      //   if (value.length === 0) {
      //     licenseNumberValid = false;
      //     errors[name] = Strings.VALIDATION.licenseNumber;
      //   }
      // }
      // else if (name === 'insuranceNumber') {
      //   if (value.length === 0) {
      //     insuranceNumberValid = false;
      //     errors[name] = Strings.VALIDATION.insuranceNumber;
      //   }
      // }
      // else if (name === 'socialSecurityNumber') {
      //   if (value.length === 0) {
      //     socialSecurityNumberValid = false;
      //     errors[name] = Strings.VALIDATION.socialSecurityNumber;
      //   }
      // }
      else if (name === 'textInputStateValue') {
        if (_.isEmpty(textInputStateValue)) {
          textInputStateValueValid = false;
          errors[name] = Strings.VALIDATION.state;
        }
      } else if (name === 'textInputCityValue') {
        if (_.isEmpty(textInputCityValue)) {
          textInputCityValueValid = false;
          errors[name] = Strings.VALIDATION.city;
        }
      } else if (name === 'address') {
        if (value.length === 0) {
          addressValid = false;
          errors[name] = Strings.VALIDATION.address;
        }
      }
    });

    if (_.isEmpty(driverProfileImage)) {
      this.setState({driverProfileImageStatus: false});
      driverProfileImageStatusValid = false;
    }
    // mew changes

    // if (_.isEmpty(drivingLicenseFrontResponse) && drivingLicenseFrontStatus) {
    //   this.setState({drivingLicenseFrontStatus: false});
    //   licenseNumberFrontValid = false;
    // }
    // if (_.isEmpty(drivingLicenseBackResponse) && drivingLicenseBackStatus) {
    //   this.setState({drivingLicenseBackStatus: false});
    //   licenseNumberBackValid = false;
    // }
    // if (_.isEmpty(insuranceCardFrontResponse) && insuranceCardFrontStatus) {
    //   this.setState({insuranceCardFrontStatus: false});
    //   insuranceNumberFrontValid = false;
    // }
    // if (_.isEmpty(insuranceCardFrontResponse) && insuranceCardBackStatus) {
    //   this.setState({insuranceCardBackStatus: false});
    //   insuranceNumberBackValid = false;
    // }
    // mew changes

    // if (_.isEmpty(socialSecurityFrontResponse) && socialSecurityFrontStatus) {
    //   this.setState({ socialSecurityFrontStatus: false });
    //   socialSecurityFrontValid = false;
    // }
    // if (_.isEmpty(socialSecurityBackResponse) && socialSecurityBackStatus) {
    //   this.setState({ socialSecurityBackStatus: false });
    //   socialSecurityBackValid = false;
    // }

    this.setState({errors});
    if (
      driverProfileImageStatusValid &&
      firstNameValid &&
      lastNameValid &&
      phoneNumberValid &&
      emailValid &&
      passwordValid &&
      // dateValid &&
      // licenseNumberValid &&
      // licenseNumberFrontValid &&
      // insuranceNumberValid &&
      // insuranceNumberFrontValid &&
      // insuranceNumberBackValid &&
      // socialSecurityNumberValid &&
      // socialSecurityFrontValid &&
      // socialSecurityBackValid &&
      textInputStateValueValid &&
      textInputCityValueValid &&
      address
    ) {
      const formData = new FormData();
      const userHalfObject = {
        image_url: driverProfileImageResponse,
        first_name: firstName,
        last_name: lastName,
        mobile_no: phoneNumber,
        email: email,
        password,
        dob: date,
        // license_number: licenseNumber,
        license_number_image_front: drivingLicenseFrontResponse,
        license_number_image_back: drivingLicenseBackResponse,
        // insurance_card_number: insuranceNumber, // to remove
        insurance_card_image_front: insuranceCardFrontResponse,
        insurance_card_image_back: insuranceCardBackResponse,
        social_security_number: socialSecurityNumber,
        // social_security_image_front: socialSecurityFrontResponse,
        // social_security_image_back: socialSecurityBackResponse,
        state_id: textInputStateId + '',
        city_id: textInputCityId + '',
        address: address,
      };

      console.log('userHalfObject ******* ', userHalfObject);
      push('signupCarDetail', {
        userHalfObject: userHalfObject,
        driverProfileImage: driverProfileImage,
      });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      date,
      password,
      licenseNumber,
      address,
      driverProfileImage,

      textInputStateValue,
      stateDateModal,
      textInputCityValue,
      cityDateModal,
      errors,
    } = this.state;
    const {stateData} = this.props;

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
        }}
        // automaticallyAdjustContentInsets={true}
      >
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
              title="Create your account"
              style={{fontSize: Fonts.size.xLarge, marginBottom: 5}}
            />
            <Text
              style={{textAlign: 'center'}}
              type="medium"
              size="xSmall"
              color="white">
              Enter your details to signup
            </Text>
          </View>

          {this._renderDriverProfile()}

          <TextFieldBorder
            textFieldImage={Images.person}
            placeholder={Strings.PLACEHOLDER.firstName}
            value={firstName}
            onChangeText={(firstName) => this.setState({firstName})}
            returnKeyType="next"
            onSubmitEditing={() => this.lastName.focus()}
            reference={(ref) => {
              this.firstName = ref;
            }}
            onFocus={this._onFocus}
            error={errors.firstName}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <TextFieldBorder
            textFieldImage={Images.person}
            placeholder={Strings.PLACEHOLDER.lastName}
            value={lastName}
            onChangeText={(lastName) => this.setState({lastName})}
            returnKeyType="next"
            onSubmitEditing={() => this.phoneNumber.focus()}
            reference={(ref) => {
              this.lastName = ref;
            }}
            onFocus={this._onFocus}
            error={errors.lastName}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />

          <TextFieldBorder
            textFieldImage={Images.phone}
            placeholder={Strings.PLACEHOLDER.phoneNumber}
            value={phoneNumber}
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            returnKeyType="next"
            onSubmitEditing={() => this.email.focus()}
            reference={(ref) => {
              this.phoneNumber = ref;
            }}
            keyboardType="phone-pad"
            onFocus={this._onFocus}
            error={errors.phoneNumber}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <TextFieldBorder
            textFieldImage={Images.email}
            placeholder={Strings.PLACEHOLDER.email}
            value={email}
            onChangeText={(email) => this.setState({email})}
            returnKeyType="next"
            onSubmitEditing={() => null}
            reference={(ref) => {
              this.email = ref;
            }}
            keyboardType="email-address"
            onFocus={this._onFocus}
            error={errors.email}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <ButtonView onPress={this._showDateTimePicker}>
            <TextFieldBorder
              // editable={false}
              pointerEvents="none"
              textFieldImage={Images.calender}
              placeholder={'MM/DD/YY'}
              value={date}
              onChangeText={(date) => this.setState({date})}
              // returnKeyType="next"
              onSubmitEditing={() => this.password.focus()}
              reference={(ref) => {
                this.date = ref;
              }}
              // keyboardType="email-address"
              onFocus={this._onFocus}
              error={errors.date}
              textFieldStyle={styles.textfield}
              autoCapitalize="none"
            />
          </ButtonView>
          <TextFieldBorder
            textFieldImage={Images.key}
            placeholder={Strings.PLACEHOLDER.password}
            value={password}
            onChangeText={(password) => this.setState({password})}
            returnKeyType="done"
            onSubmitEditing={() => null}
            reference={(ref) => {
              this.password = ref;
            }}
            secureTextEntry
            onFocus={this._onFocus}
            error={errors.password}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />

          {this._renderDrivingLicense()}

          {this._renderInsuranceCardMainView()}
          {this._renderSocialSecuityContainer()}

          <View
            style={{
              flexDirection: 'row',
              width: Metrics.screenWidth - Metrics.ratio(100),
            }}>
            <ModalSelector
              data={stateDateModal}
              initValue="State"
              onChange={(option) => {
                console.log('Modal Selector  ***** ', option);

                this.setState({
                  textInputStateValue: option.label,
                  textInputStateId: option.value,
                });
                const payload = {
                  id: option.value,
                };
                this.props.requestCity(payload);
              }}>
              <TextFieldBorder
                pointerEvents="none"
                rightTextFieldImage={Images.rightThin}
                placeholder={'State'}
                value={textInputStateValue}
                // onChangeText={address => this.setState({ address })}
                // returnKeyType="done"
                onSubmitEditing={() => null}
                reference={(ref) => {
                  this.textInputStateValue = ref;
                }}
                onFocus={this._onFocus}
                error={errors.textInputStateValue}
                textFieldStyle={[
                  styles.textfield,
                  {
                    width: (Metrics.screenWidth - Metrics.ratio(116)) / 2,
                    marginRight: Metrics.baseMargin,
                  },
                ]}
                autoCapitalize="none"
              />
            </ModalSelector>

            <ModalSelector
              data={cityDateModal}
              initValue="City"
              onChange={(option) => {
                console.log('Modal Selector  ***** ', option);

                this.setState({
                  textInputCityValue: option.label,
                  textInputCityId: option.value,
                });
              }}>
              <TextFieldBorder
                // textFieldImage={Images.address}
                rightTextFieldImage={Images.rightThin}
                placeholder={'City'}
                value={textInputCityValue}
                // onChangeText={address => this.setState({ address })}
                returnKeyType="done"
                onSubmitEditing={() => null}
                reference={(ref) => {
                  this.textInputCityValue = ref;
                }}
                onFocus={this._onFocus}
                error={errors.textInputCityValue}
                textFieldStyle={[
                  styles.textfield,
                  {
                    width: (Metrics.screenWidth - Metrics.ratio(116)) / 2,
                    // marginRight: Metrics.baseMargin
                    // marginLeft: Metrics.baseMargin
                  },
                ]}
                autoCapitalize="none"
              />
            </ModalSelector>
          </View>

          <TextFieldBorder
            textFieldImage={Images.address}
            placeholder={'Address'}
            value={address}
            onChangeText={(address) => this.setState({address})}
            returnKeyType="done"
            onSubmitEditing={() => null}
            reference={(ref) => {
              this.address = ref;
            }}
            onFocus={this._onFocus}
            error={errors.address}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <AppButton
            buttonTitle="Next"
            onPress={() => {
              this._submitHalfSignUpForm();
            }}
          />
          <ButtonView
            style={{paddingVertical: Metrics.baseMargin}}
            onPress={() => push('login')}>
            <Text type="regular" size="small">
              Already have an account?{' '}
              <Text type="regular" size="large">
                Log In
              </Text>
            </Text>
          </ButtonView>
          {this._renderDatePicker()}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
  stateData: state.SignUpReducer.sateData,
  cityData: state.SignUpReducer.cityData,
});

const actions = {requestState, requestCity};

export default connect(mapStateToProps, actions)(SignUp);
