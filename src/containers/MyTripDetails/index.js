// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {Colors, Images, Metrics} from '../../theme';
import {Text, Separator} from '../../components';
import {CarDetailCell, RideStatusCell, DriveAddress} from '../../appComponents';
import styles from './styles';
import Utils from '../../util';
import moment from 'moment';
import _ from 'lodash';
import {
  request as tripDetailsRequest,
  success as tripDetailsSuccess,
  failure as tripDetailsFailure,
} from '../../actions/TripDetailsAction';

class MyTripDetails extends Component {
  componentDidMount() {
    const {navigation} = this.props;
    console.log('componentDidMount navigation : ', navigation);
    this.props.tripDetailsRequest({
      trip_id:
        navigation.state.params.item && navigation.state.params.item.item
          ? navigation.state.params.item.item.id
          : navigation.state.params.item.id,
    });
  }

  render() {
    const {TripDetails} = this.props;
    console.log('render navigation : ', TripDetails);
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            height: 76,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width:
                Metrics.screenWidth -
                (Metrics.doubleBaseMargin + Metrics.baseMargin),
            }}>
            <Text color="aztec" size="xLarge" type="regular">
              Ride Details
            </Text>
            <Text color="aztec" size="xSmall" type="regular">
              Here you can see rides that you have completed.
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 60,
          }}>
          <View
            style={{
              width:
                Metrics.screenWidth -
                (Metrics.doubleBaseMargin + Metrics.baseMargin),
            }}>
            <RideStatusCell
              date={Utils.dateFormatHandler(TripDetails.data.created_at)}
              time={moment(TripDetails.data.ride_start_time, ['h:mm A']).format(
                'HH:mm A',
              )}
              earning={`${
                TripDetails && TripDetails.data && TripDetails.data.price
                  ? TripDetails.data.price.slice(1) -
                    TripDetails.data.tip_amount.slice(1)
                  : ''
              }+${
                TripDetails && TripDetails.data && TripDetails.data.tip_amount
                  ? TripDetails.data.tip_amount
                  : ''
              } Tip`}
              earningColor={Colors.text.yellow}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width:
                Metrics.screenWidth -
                (Metrics.doubleBaseMargin + Metrics.baseMargin),
            }}>
            <Text color="aztec" size="xSmall" type="regular">
              Idea Space
            </Text>
            <Text color="aztec" size="xSmall" type="regular">
              {`${
                TripDetails &&
                TripDetails.data &&
                !_.isUndefined(TripDetails.data.distance)
                  ? TripDetails.data.distance
                  : ''
              } mi`}
            </Text>
          </View>
        </View>
        <View
          style={{
            width:
              Metrics.screenWidth -
              (Metrics.doubleBaseMargin + Metrics.baseMargin),
            height: 200,
            alignSelf: 'center',
          }}>
          <Image
            style={{
              width:
                Metrics.screenWidth -
                (Metrics.doubleBaseMargin + Metrics.baseMargin),
              height: 200,
            }}
            source={{
              uri: TripDetails.data.trip_image,
            }}
            resizeMode="cover"
          />
        </View>

        <View
          style={{
            height: 118,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <DriveAddress
            style={styles.myTripDriverAddress}
            startPoint={TripDetails.data.pickupLocation_main_text}
            endPoint={TripDetails.data.dropOffLocation_main_text}
            navImage={Images.trips}
            textColor={Colors.text.aztec}
          />
        </View>

        <Separator style={{opacity: 0.4, marginHorizontal: 25}} />

        {TripDetails && TripDetails.data && !_.isEmpty(TripDetails.data) ? (
          <View
            style={{
              height: 110,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CarDetailCell
              star={TripDetails.data.rating}
              // userData={{
              //   driver: TripDetails.data,
              //   vehicle:
              //     TripDetails &&
              //     TripDetails.data.driver_vehicle &&
              //     TripDetails.data.driver_vehicle
              // }}
              image_url={
                TripDetails &&
                TripDetails.data &&
                !_.isEmpty(TripDetails.data) &&
                TripDetails.data.passenger.image_url
              }
              userData={
                TripDetails &&
                TripDetails.data &&
                !_.isEmpty(TripDetails.data) &&
                TripDetails.data
              }
            />
          </View>
        ) : null}
        <Separator
          style={{opacity: 0.4, marginBottom: 61, marginHorizontal: 25}}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  TripDetails: state.tripDetails,
  networkInfo: state.networkInfo,
});

const actions = {
  tripDetailsRequest,
  tripDetailsSuccess,
  tripDetailsFailure,
};

export default connect(mapStateToProps, actions)(MyTripDetails);
