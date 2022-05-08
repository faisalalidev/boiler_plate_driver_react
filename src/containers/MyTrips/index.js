// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Image, TouchableNativeFeedback, SectionList} from 'react-native';
import {Text, FlatList, Separator, ButtonView, Loading} from '../../components';
import {Modal} from '../../appComponents';
import styles from './styles';
import {Images, Colors, Strings} from '../../theme';
import moment from 'moment';
import Utils from '../../util';
import {
  request as myEarningsRequest,
  success as myEarningsSuccess,
  failure as myEarningsFailure,
} from '../../actions/MyEarningsAction';
import {
  request as myTripByDateRequest,
  success as myTripByDateSuccess,
  failure as myTripByDateFailure,
} from '../../actions/myTripByDateAction';
import FlatListHandler from '../../appComponents/FlatListHandler';
import _ from 'lodash';
import {push} from '../../services/NavigationService';

class MyTrips extends Component {
  state = {
    date: false,
  };
  componentDidMount() {
    this.props.myEarningsRequest();
  }
  _listItem = (item) => {
    const data =
      item && item.item && !_.isUndefined(item.item) ? item.item : item;

    return (
      <ButtonView
        onPress={() => push('MyTripDetails', {item})}
        style={styles.listItemContainer}>
        <View style={{flex: 1}}>
          <Image source={Images.location} />
        </View>
        <View style={styles.listItemSubContainer}>
          <Text color="aztec" size="xSmall" type="medium" numberOfLines={2}>
            {data.dropOffLocation_description}
          </Text>
          <Text size="xxSmall" color="grey">
            {data.dropOffLocation_secondary_text}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text color="aztec" size="xSmall" type="medium">
            {data && data.price && data.price !== null ? `$ ${data.price}` : ''}
          </Text>
        </View>
      </ButtonView>
    );
  };
  _dayHead = (value) => {
    return (
      <Text
        style={styles.dayHeadContainer}
        color="aztec"
        size="xLarge"
        type="medium">
        {value}
      </Text>
    );
  };

  _renderItems = ({item, index}) => {
    if (Utils.dateFormatHandler(item.created_at) === 'Today') {
      return <View>{this._listItem(item)}</View>;
    } else if (Utils.dateFormatHandler(item.created_at) === 'Yesterday') {
      return <View>{this._listItem(item)}</View>;
    } else {
      return this._listItem(item);
    }
  };
  _todayAndYesterday() {
    const {MyEarnings} = this.props;

    return !MyEarnings.dataByDate ? (
      <SectionList
        sections={[
          {
            title: "Today's Rides",
            data:
              MyEarnings.data && MyEarnings.data.today
                ? MyEarnings.data.today
                : [],
          },
          {
            title: "Yesterday's Rides",
            data:
              MyEarnings.data && MyEarnings.data.yesterday
                ? MyEarnings.data.yesterday
                : [],
          },
        ]}
        ItemSeparatorComponent={() => <Separator style={styles.separator} />}
        renderSectionHeader={({section}) => this._dayHead(section.title)}
        renderItem={this._renderItems}
      />
    ) : (
      <FlatListHandler
        renderItem={this._listItem}
        data={MyEarnings.data.length && MyEarnings.data}
        ItemSeparatorComponent={this.itemSeparator}
      />
    );
  }

  //   <FlatList
  //   data={MyEarnings.data ? MyEarnings.data : []}
  //   ItemSeparatorComponent={() => <Separator style={styles.separator} />}
  //   renderItem={this._listItem}
  // />
  _selectDateHander = (date) => {
    console.log('_selectDateHander **** ', date);
    if (date) {
      this.setState({date});
      this.props.myTripByDateRequest({params: date});
    }
  };
  _renderNodata() {
    const {networkInfo} = this.props;
    return (
      <View style={styles.noDatafoundStyle}>
        <Text color="grey" size="small" type="medium">
          {networkInfo.isNetworkConnected
            ? Strings.PLACEHOLDER.noDataFound
            : Strings.PLACEHOLDER.networkInfo}
        </Text>
      </View>
    );
  }
  _closeFilter = () => {
    this.props.myEarningsRequest();
  };
  _renderDateModal = () => {
    const {MyEarnings} = this.props;
    const {date} = this.state;
    return (
      <ButtonView
        onPress={() => this.calender.show()}
        activeOpacity={1}
        style={styles.subContainer}>
        <Modal.CalendarView
          ref={(ref) => {
            this.calender = ref;
          }}
          onPress={(date) => this._selectDateHander(date)}
        />
        <Text color="grey" size="xSmall" type="medium">
          {MyEarnings.dataByDate ? date : moment().format('MMMM YYYY')}
        </Text>
        <ButtonView onPress={this._closeFilter} activeOpacity={1}>
          <Image
            style={MyEarnings.dataByDate && {width: 25, height: 25}}
            source={
              MyEarnings.dataByDate ? Images.ic_close : Images.rightAngelThin
            }
          />
        </ButtonView>
      </ButtonView>
    );
  };
  render() {
    const {MyEarnings, networkInfo} = this.props;
    return (
      <View style={styles.container}>
        {this._renderDateModal()}
        <Separator style={styles.separator} />
        {this._todayAndYesterday()}
        <Loading loading={this.props.MyEarnings.isFetching} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  MyEarnings: state.myEarnings,
  networkInfo: state.networkInfo,
});

const actions = {
  myEarningsRequest,
  myEarningsSuccess,
  myEarningsFailure,
  myTripByDateRequest,
  myTripByDateSuccess,
  myTripByDateFailure,
};

export default connect(mapStateToProps, actions)(MyTrips);
