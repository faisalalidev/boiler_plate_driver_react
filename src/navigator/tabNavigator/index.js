import React from 'react';
import {Text, View} from 'react-native';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
import {Images, Colors, Fonts, Metrics} from '../../theme';
import MyEarnings from '../../appComponents/MyEarnings';
import MyTrips from '../../appComponents/MyTrips';

const TabNavigator = createMaterialTopTabNavigator(
  {
    'My Earnings': MyEarnings,
    'My Trips': MyTrips,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tabNavigator.active,
      inactiveTintColor: Colors.tabNavigator.inactive,
      indicatorStyle: {
        borderBottomWidth: 3,
        borderBottomColor: Colors.tabNavigator.indicator,
      },
      style: {backgroundColor: Colors.primary},
    },
  },
);

export default createAppContainer(TabNavigator);
