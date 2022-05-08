import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {View, Image, TouchableOpacity, StatusBar} from 'react-native';
import {Button, ButtonView, Text, Separator} from '../../../components';
import styles from './styles';
import {Metrics, Colors, Images, Fonts} from '../../../theme';
import StarRating from 'react-native-star-rating';

export default class RatingModal extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPress: () => null,
  };

  state = {
    isVisible: false,
    starCount: 0,
  };

  show() {
    this.setState({isVisible: true});
  }

  hide = () => {
    this.setState({
      isVisible: false,
    });
  };
  _rating = () => {
    return this.state.starCount;
  };

  render() {
    const {isVisible} = this.state;
    const {onPress} = this.props;
    return (
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View
              style={{
                height: 262,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={styles.Heading}>
                <Text type="medium" size="medium" color="darkestGrey">
                  Your Rating
                </Text>
              </View>

              <StarRating
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={starCount => this.setState({starCount})}
                fullStarColor={'#ffa800'}
                starSize={37}
                fullStar={Images.activeStar}
                emptyStar={Images.inActiveStar}
                buttonStyle={{
                  paddingHorizontal: 6,
                }}
              />

              <View style={styles.ratingReview}>
                <Text
                  type="medium"
                  size="xSmall"
                  color="gray"
                  style={{textAlign: 'center'}}>
                  It was a really good experience having a ride with you.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
              <Text color="darkGrey" size="large" type="darkestGrey">
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
