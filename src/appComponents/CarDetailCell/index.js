import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Image} from 'react-native';
import {Text, ButtonView, AppButton, Separator} from '../../components';
import {ProfileImage, DistanceTimeEstimate} from '../../appComponents';
import styles from './styles';
import {Colors, Images, Metrics} from '../../theme';
import StarRating from 'react-native-star-rating';
import Utils from '../../util';

const CarDetailCell = (props: Object) => {
  const {
    style,
    startPoint,
    destination,
    star,
    userData,
    image_url,
    ...rest
  } = props;
  console.log('userData *******  CarDetailCell', userData);
  return (
    <View style={[styles.container, style]}>
      <ProfileImage
        image={{uri: Utils.imageUrlConverter(image_url)}}
        borderRadius={29}
        imageSize={styles.acceptRideImageSize}
        imageValidation
      />
      <View style={{flex: 1, alignSelf: 'center'}}>
        <Text color="darkGrey" size="xSmall" type="medium">
          {userData.name}
        </Text>
        <Text size="xxSmall" color="grey">
          {userData.vehicle.car_color} - {userData.vehicle.car_model_name}
        </Text>
        <Text size="xxSmall" color="grey">
          {userData.vehicle.car_registration_number}
        </Text>
        {!_.isUndefined(star) ? (
          <View style={{width: 80}}>
            <StarRating
              starSize={15}
              disabled
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              maxStars={5}
              rating={userData.rating}
              selectedStar={rating => this.onStarRatingPress(rating)}
              fullStarColor={'#ffa800'}
            />
          </View>
        ) : null}
      </View>
      <View
        style={{
          flex: 0.9,
          alignItems: 'flex-end',
        }}>
        <Image source={Images.carPlaceholder} style={{}} />
      </View>
    </View>
  );
};

CarDetailCell.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  startPoint: PropTypes.string,
  destination: PropTypes.string,
};

CarDetailCell.defaultProps = {
  style: {},
  startPoint: '30 Newbury St, 3rd Floor, Boston,',
  destination: '867 Boylston Street, 5th Floor, Boston',
};

export default CarDetailCell;
