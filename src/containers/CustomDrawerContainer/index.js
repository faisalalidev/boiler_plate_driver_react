// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, Image, FlatList, StatusBar, ScrollView} from 'react-native';
import {Text, ButtonView, Separator, DrawerCard} from '../../components';
import {ProfileImage} from '../../appComponents';
import styles from './styles';
import Utils from '../../util';
import {withNavigationFocus} from 'react-navigation';
import {drawerRoutes} from './Routes';
import {Metrics, Images, Colors, Fonts} from '../../theme';
import {navigate, push, toggleDrawer} from '../../services/NavigationService';

class CustomDrawerContainer extends Component {
  onPressDrawerItem = (route) => (ev) => {
    toggleDrawer();
    navigate(route);
  };

  renderDrawerCell = ({item}) => {
    return (
      <DrawerCard
        myText={item.title}
        onPress={this.onPressDrawerItem(item.route)}
        textColor={
          item.IsActive === true ? Colors.text.black : Colors.text.white
        }
        style={{
          backgroundColor:
            item.IsActive === true
              ? Colors.appbutton.primary
              : Colors.background.secondary,
        }}
      />
    );
  };

  render() {
    const {navigation, user} = this.props;
    const userData = user.data;

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
          }}>
          <ProfileImage
            onPress={() => navigation.navigate('profile')}
            image={{uri: Utils.imageUrlConverter(userData.image_url)}}
            name={userData.name}
            email={userData.email}
            imageValidation
          />
        </View>

        <FlatList
          data={drawerRoutes()}
          style={{flex: 2}}
          renderItem={this.renderDrawerCell}
          keyExtractor={(item) => item.route}
          bounces={false}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const actions = {};

export default connect(mapStateToProps, actions)(CustomDrawerContainer);
