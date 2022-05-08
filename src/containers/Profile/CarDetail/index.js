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
import styles from './styles';
import {Images, Metrics, Fonts, Colors, Strings} from '../../../theme';
import {
  Text,
  TextFieldBorder,
  ButtonView,
  BoldHeading,
  AppButton,
  Loading,
  ValidationText,
} from '../../../components';

import Utils from '../../../util';
import {CardFrontBackImage} from '../../../appComponents';
class CarDetail extends Component {
  constructor(props) {
    super(props);
  }
  _renderCarDetail = (driverProfile) => {
    return (
      <View>
        <TextFieldBorder
          textFieldImage={Images.car}
          placeholder={'Car Make'}
          value={driverProfile.vehicle.car_make}
          //   onChangeText={carMake => this.setState({ carMake })}
          editable={false}
          returnKeyType="next"
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
        <TextFieldBorder
          textFieldImage={Images.car}
          editable={false}
          placeholder={'Car Model Name'}
          value={driverProfile.vehicle.car_model_name}
          returnKeyType="next"
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
        <TextFieldBorder
          textFieldImage={Images.car}
          editable={false}
          placeholder={'Car Model Year'}
          value={driverProfile.vehicle.car_model_year}
          returnKeyType="next"
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
        <TextFieldBorder
          textFieldImage={Images.car}
          editable={false}
          placeholder={'Car Color'}
          value={driverProfile.vehicle.car_color}
          returnKeyType="next"
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
        <TextFieldBorder
          textFieldImage={Images.car}
          editable={false}
          placeholder={'Car Transmission'}
          value={driverProfile.vehicle.car_transmission}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
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

  _renderCarRegistration = (driverProfile) => {
    return (
      <View>
        {this._renderSectionHeading('Car Registration')}
        {/*<TextFieldBorder
          placeholder={'Registration Number'}
          value={driverProfile.vehicle.car_registration_number}
          returnKeyType="next"
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
          editable={false}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: Metrics.screenWidth - Metrics.ratio(100),
          }}>
          <CardFrontBackImage
            image={Utils.imageUrlConverter(
              driverProfile.vehicle.car_registration_number_img_front,
            )}
          />
          {/*<CardFrontBackImage
            image={Utils.imageUrlConverter(
              driverProfile.vehicle.car_registration_number_img_back
            )}
            /> */}
        </View>
      </View>
    );
  };

  _renderCarInsurance = (driverProfile) => {
    return (
      <View>
        {this._renderSectionHeading('Car Insurance')}
        {/* <TextFieldBorder
          placeholder={'Insurance Number'}
          value={driverProfile.vehicle.car_insurance_number}
          returnKeyType="next"
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
          editable={false}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: "red",
            alignItems: 'center',
            width: Metrics.screenWidth - Metrics.ratio(100),
          }}>
          <CardFrontBackImage
            image={Utils.imageUrlConverter(
              driverProfile.vehicle.car_insurance_number_img_front,
            )}
          />
          {/* <CardFrontBackImage
            image={Utils.imageUrlConverter(
              driverProfile.vehicle.car_insurance_number_img_back
            )}
            /> */}
        </View>
      </View>
    );
  };

  render() {
    const {driverProfile} = this.props;
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
            <BoldHeading title="Car Details" />
          </View>
          {this._renderCarDetail(driverProfile)}
          {this._renderCarRegistration(driverProfile)}
          {this._renderCarInsurance(driverProfile)}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
  driverProfile: state.user.data,
  isFetching: state.user.isFetching,
});

const actions = {};

export default connect(mapStateToProps, actions)(CarDetail);
