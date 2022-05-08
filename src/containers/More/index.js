// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, FlatList, Alert, Image} from 'react-native';
import {Text, Separator, ButtonView, ListItem} from '../../components';
import {Modal} from '../../appComponents';
import styles from './styles';
import {Images, Metrics} from '../../theme';
import Utils from '../../util';
import Geolocation from '@react-native-community/geolocation';

import {logout} from '../../actions/Login';
import {request as requestDriverLogout} from '../../actions/SocketActions/DriverLogout';
import _ from 'lodash';

import {
  PRIVACY_POLICY,
  TERM_CONDITION,
  HELP,
  ABOUT_US,
  FAQ,
} from '../../config/WebService';
import LocationService from '../../services/LocationService';
import {request as requestDriverOnlineStatus} from '../../actions/SocketActions/DriverOnlineStatus';
import LocationServiceAndroid from '../../services/LocationServiceAndroid';
import {LoginContext} from '../../';
import {push} from '../../services/NavigationService';

class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreItems: [
        {
          title: 'Help & FAQ',
          onPress: () => {
            push('webView', {
              websiteUrl: FAQ,
              title: 'Help & FAQ',
            });
          },
          rightImage: Images.faq,
          descriptionInputText: false,
        },
        {
          title: 'About Rydr',
          onPress: () =>
            push('webView', {
              websiteUrl: ABOUT_US,
              title: 'About Rydr',
            }),
          rightImage: Images.about,
          descriptionInputText: false,
        },
        {
          title: 'Privacy Policy',
          onPress: () =>
            push('webView', {
              websiteUrl: PRIVACY_POLICY,
              title: 'Privacy Policy',
            }),
          rightImage: Images.privacy,
          descriptionInputText: false,
        },
        {
          title: 'Terms and Conditions',
          onPress: () =>
            push('webView', {
              websiteUrl: TERM_CONDITION,
              title: 'Terms & Conditions',
            }),
          rightImage: Images.term,
          descriptionInputText: false,
        },
        {
          title: 'Logout',
          rightImage: Images.logout,
          descriptionInputText: false,
          onPress: () => {
            this.logoutModal.show();
          },
        },
      ],
    }; // end of state
  }

  static propTypes = {};

  shouldComponentUpdate(nextProps: Object) {
    return !_.isEqual(nextProps, this.props);
  }

  _renderLogoutModal = () => {
    return (
      <LoginContext.Consumer>
        {({setLogin}) => (
          <Modal.Dialogue
            ref={(ref) => {
              this.logoutModal = ref;
            }}
            description="Do you really want to logout ?"
            title="Logout"
            leftButton="No"
            rightButton="Yes"
            isButton
            rightButtonPress={() => {
              this.props.requestDriverOnlineStatus({status: '0'}); // to make driver offline
              this.logoutModal.hide();
              this.props.logout();
              Utils.setUserToken('');
              Utils.setSocketAccessToken('');
              Utils.setUserIDFromSocket('');
              Utils.getSocketRef().requestDisconnect();
              setLogin(false);

              // for stop tracking

              if (Utils.isPlatformAndroid()) {
                console.log('android chla ');
                LocationServiceAndroid.clearWatchId();
              } else {
                Geolocation.clearWatch(LocationService.getWatchID());
                Geolocation.stopObserving();
              }

              // call stop tracking method as well
            }}
            leftButtonPress={() => this.logoutModal.hide()}
          />
        )}
      </LoginContext.Consumer>
    );
  };

  _renderItems = ({item, index}) => {
    return <ListItem item={item} />;
  };

  render() {
    const {moreItems} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={moreItems}
          style={styles.listStyle}
          renderItem={this._renderItems}
          ItemSeparatorComponent={() => (
            <Separator style={styles.sepratorStyle} />
          )}
        />
        {this._renderLogoutModal()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
});
const actions = {logout, requestDriverOnlineStatus, requestDriverLogout};

export default connect(mapStateToProps, actions)(More);
