// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Image, TouchableNativeFeedback} from 'react-native';
import {Text, FlatList, Separator, ButtonView} from '../../components';
import {Modal} from '../../appComponents';
import styles from './styles';
import {Images, Colors} from '../../theme';
import moment from 'moment';
import Utils from '../../util';
import {
  request as myEarningsRequest,
  success as myEarningsSuccess,
  failure as myEarningsFailure,
} from '../../actions/MyEarningsAction';

const rides = [
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date(),
  },
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '3.00',
    date: new Date(),
  },
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '6.00',
    date: new Date(),
  },
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '2.64',
    date: new Date(),
  },
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '3.00',
    date: new Date(),
  },
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date(),
  },
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '3.00',
    date: new Date(),
  },
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '6.00',
    date: new Date('April 02, 2019'),
  },
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '2.64',
    date: new Date('April 02, 2019'),
  },
  {
    image: Images.location,
    address1: 'Gaslight Bresserie du Coin',
    address2: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '3.00',
    date: new Date('April 02, 2019'),
  },
];
let todayShow = true;
let yesterdayShow = true;
const MyEarnings = (props: Object) => {
  _listItem = item => {
    return (
      <ButtonView
        onPress={() => alert('touchable')}
        style={styles.listItemContainer}>
        <View style={{flex: 1}}>
          <Image source={item.image} />
        </View>
        <View style={styles.listItemSubContainer}>
          <Text color="aztec" size="xSmall" type="medium">
            {item.address1}
          </Text>
          <Text size="xxSmall" color="grey">
            {item.address2}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text color="aztec" size="xSmall" type="medium">
            {item.earning}
          </Text>
        </View>
      </ButtonView>
    );
  };
  _dayHead = value => {
    return (
      <View style={styles.dayHeadContainer}>
        <Text color="aztec" size="xLarge" type="medium">
          {value}
        </Text>
      </View>
    );
  };
  _renderItems = ({item, index}) => {
    if (Utils.dateFormatHandler(item.date) === 'Today' && todayShow) {
      todayShow = false;
      return (
        <View>
          {this._dayHead("Today's Rides")}
          {this._listItem(item)}
        </View>
      );
    } else if (
      Utils.dateFormatHandler(item.date) === 'Yesterday' &&
      yesterdayShow
    ) {
      yesterdayShow = false;
      return (
        <View>
          {this._dayHead("Yesterday's Rides")}
          {this._listItem(item)}
        </View>
      );
    } else {
      return this._listItem(item);
    }
  };
  _showCalendar = () => {};
  return (
    <View style={styles.container}>
      <ButtonView
        onPress={() => this.calender.show()}
        activeOpacity={1}
        style={styles.subContainer}>
        <Modal.CalendarView
          ref={ref => {
            this.calender = ref;
          }}
          onPress={() => ''}
        />
        <Text
          onPress={this._showCalendar}
          color="grey"
          size="xSmall"
          type="medium">
          January 2019
        </Text>
        <Image source={Images.rightAngelThin} />
      </ButtonView>
      <FlatList
        data={rides}
        ItemSeparatorComponent={() => <Separator style={styles.separator} />}
        renderItem={this._renderItems}
      />
    </View>
  );
};

export default MyEarnings;
