// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {Text, TextFieldBorder, ButtonView, FlatList} from '../../../components';
import {CardFrontBackImage} from '../../../appComponents';
import styles from './styles';
import {Metrics, Colors, Images} from '../../../theme';
import Utils from '../../../util';
import style from 'react-native-modal-selector/style';

class PersonalDetail extends Component {
  constructor(props) {
    super(props);
  }

  _renderSectionHeading = title => {
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
  _renderCardImage = image => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: image}}
          style={{backgroundColor: 'yellow'}}
          resizeMode="cover"
          resizeMethod="resize"
          style={{
            width: 120,
            height: 80,
          }}
        />
      </View>
    );
  };
  _renderDrivingLicense = driverProfile => {
    return (
      <View>
        {this._renderSectionHeading('Driving License')}
        {/* <TextFieldBorder
          placeholder={'License Number'}
          value={driverProfile.license_number}
          editable={false}
          reference={ref => {
            this.licenseNumber = ref;
          }}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        /> */}
        <View style={styles.cardContainer}>
          <CardFrontBackImage
            image={Utils.imageUrlConverter(
              driverProfile.license_number_image_front,
            )}
          />
          {/*<CardFrontBackImage
            image={Utils.imageUrlConverter(
              driverProfile.license_number_image_back
            )}
            /> */}
        </View>
      </View>
    );
  };

  _renderInsuranceCardMainView = driverProfile => {
    return (
      <View>
        {this._renderSectionHeading('Insurance Card')}
        {/*<TextFieldBorder
          placeholder={'Insurance Card Number'}
          value={driverProfile.insurance_card_number}
          reference={ref => {
            this.insuranceNumber = ref;
          }}
          editable={false}
          // keyboardType="number-pad"
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        /> */}
        <View style={styles.cardContainer}>
          <CardFrontBackImage
            image={Utils.imageUrlConverter(
              driverProfile.insurance_card_image_front,
            )}
          />
          {/* <CardFrontBackImage
            image={Utils.imageUrlConverter(
              driverProfile.insurance_card_image_back
            )}
            /> */}
        </View>
      </View>
    );
  };

  _renderSocialSecuityContainer = driverProfile => {
    return (
      <View>
        {this._renderSectionHeading('Social Security Card')}
        <TextFieldBorder
          placeholder={'Social Card Number'}
          value={driverProfile.social_security_number}
          reference={ref => {
            this.socialSecurityNumber = ref;
          }}
          editable={false}
          textFieldStyle={styles.textfield}
          autoCapitalize="none"
        />
      </View>
    );
  };

  render() {
    const {driverProfile} = this.props;
    console.log('driverProfile ***** ', driverProfile);
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        overScrollMode="always"
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        ref={ref => {
          this.scrollView = ref;
        }}>
        <View style={styles.container}>
          {this._renderDrivingLicense(driverProfile)}
          {this._renderInsuranceCardMainView(driverProfile)}
          {this._renderSocialSecuityContainer(driverProfile)}

          <View
            style={{
              flexDirection: 'row',
              width: Metrics.screenWidth - Metrics.ratio(100),
            }}>
            <TextFieldBorder
              value={driverProfile.state_id.label}
              editable={false}
              reference={ref => {
                this.textInputStateValue = ref;
              }}
              textFieldStyle={[
                styles.textfield,
                {
                  width: (Metrics.screenWidth - Metrics.ratio(116)) / 2,
                  marginRight: Metrics.baseMargin,
                },
              ]}
            />

            <TextFieldBorder
              value={driverProfile.city_id.label}
              reference={ref => {
                this.textInputCityValue = ref;
              }}
              editable={false}
              textFieldStyle={[
                styles.textfield,
                {
                  width: (Metrics.screenWidth - Metrics.ratio(116)) / 2,
                  // marginRight: Metrics.baseMargin
                  // marginLeft: Metrics.baseMargin
                },
              ]}
            />
          </View>
          <TextFieldBorder
            textFieldImage={Images.address}
            value={driverProfile.address}
            reference={ref => {
              this.address = ref;
            }}
            editable={false}
            textFieldStyle={styles.textfield}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  networkInfo: state.networkInfo,
  driverProfile: state.user.data,
  isFetching: state.user.isFetching,
});
const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(PersonalDetail);
