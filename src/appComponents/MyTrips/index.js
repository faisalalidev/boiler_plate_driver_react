// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, FlatList, ButtonView} from '../../components';
import {RideStatusCell, DriveAddress} from '../../appComponents';
import styles from './styles';
import {Images, Colors} from '../../theme';
import moment from 'moment';
import Utils from '../../util';
import {
  request as myTripsRequest,
  success as myTripsSuccess,
  failure as myTripsFailure,
} from '../../actions/MyTripsAction';

const rides = [
  {
    navStart: 'Gaslight Bresserie du Coin A',
    navEnd: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date(),
    time: '6:45 PM',
  },
  {
    navStart: 'Gaslight Bresserie du Coin B',
    navEnd: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date(),
    time: '6:45 PM',
  },
  {
    navStart: 'Gaslight Bresserie du Coin C',
    navEnd: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date(),
    time: '6:45 PM',
  },
  {
    navStart: 'Gaslight Bresserie du Coin D',
    navEnd: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date('April 02, 2019'),
    time: '6:45 PM',
  },
  {
    navStart: 'Gaslight Bresserie du Coin E',
    navEnd: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date('April 02, 2019'),
    time: '6:45 PM',
  },
  {
    navStart: 'Gaslight Bresserie du Coin F',
    navEnd: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date('April 02, 2019'),
    time: '6:45 PM',
  },
  {
    navStart: 'Gaslight Bresserie du Coin G',
    navEnd: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date('April 01, 2019'),
    time: '6:45 PM',
  },
  {
    navStart: 'Gaslight Bresserie du Coin H',
    navEnd: '560 Harrison Ave, Boston, MA 02118',
    earning: '$ ' + '5.22',
    date: new Date('April 01, 2019'),
    time: '6:45 PM',
  },
];

const MyTrips = (props: Object) => {
  _listItem = item => {
    return (
      <ButtonView
        onPress={() => alert('touchable')}
        style={styles.listItemContainer}>
        <RideStatusCell
          date={Utils.dateFormatHandler(item.date)}
          time={item.time}
          earning={item.earning}
        />
        <DriveAddress
          style={styles.driverAddress}
          startPoint={item.navStart}
          endPoint={item.navEnd}
          navImage={Images.trips}
          textColor={Colors.text.grey}
        />
      </ButtonView>
    );
  };
  _renderItems = ({item, index}) => {
    return this._listItem(item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        ItemSeparatorComponent={false}
        renderItem={this._renderItems}
      />
    </View>
  );
};

export default MyTrips;
