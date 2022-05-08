import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {View, Image, TouchableOpacity, StatusBar} from 'react-native';
import {Text} from '../../../components';
import styles from './styles';
import {Colors, Images, Fonts} from '../../../theme';
import {Calendar, LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

LocaleConfig.defaultLocale = 'fr';

export default class CalendarView extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPress: () => null,
  };

  state = {
    isVisible: false,
    selectedDate: '',
  };

  show() {
    this.setState({isVisible: true});
  }

  hide = () => {
    this.setState({
      isVisible: false,
    });
  };
  selectDateHandler = date => {
    this.hide();
    this.props.onPress(date);
  };

  render() {
    const {isVisible, selectedDate} = this.state;
    return (
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.headerImage}>
              <Image source={Images.icCalender} />
            </View>

            <Calendar
              onDayPress={day => {
                this.setState({selectedDate: day.dateString});
              }}
              style={{width: '90%', height: '75%'}}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: false,
                  selectedColor: Colors.appbutton.primary,
                },
              }}
              theme={{
                textMonthFontFamily: Fonts.type.medium,
              }}
              renderArrow={direction =>
                direction === 'right' ? (
                  <Image source={Images.calRightArrow} />
                ) : (
                  <Image source={Images.calLeftArrow} />
                )
              }
            />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => this.selectDateHandler(selectedDate)}>
              <Text color="darkGrey" size="large" type="medium">
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
