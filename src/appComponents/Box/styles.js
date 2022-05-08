// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.secondary,
    borderRadius: Metrics.borderRadius,
    height: 77,
    width: 129,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: Metrics.statusBarHeight + 12,
  },
});
