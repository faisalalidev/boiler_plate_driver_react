//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {Images, Colors, Fonts} from '../theme';
import {pop} from '../services/NavigationService';

const headerThemeColor = {
  headerStyle: {
    backgroundColor: Colors.background.secondary,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
};

const headerWhiteColor = {
  headerStyle: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
};

const headerTransparent = {
  headerTransparent: true,
};

const headerHideTitle = {
  headerTitle: null,
};

const title = (title) => ({
  title,
  headerTitleStyle: {
    color: Colors.white,
  },
});

const headerLeftButton = (icon = Images.leftBlackArrow) => {
  return (
    <TouchableOpacity style={{padding: 10}} onPress={() => pop()}>
      <Image style={styles.headerLeftBtn} source={icon} />
    </TouchableOpacity>
  );
};

export {
  headerLeftButton,
  headerTransparent,
  headerHideTitle,
  headerThemeColor,
  headerWhiteColor,
  title,
};
