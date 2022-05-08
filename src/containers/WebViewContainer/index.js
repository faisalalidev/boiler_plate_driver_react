// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  Text,
  Loading,
  NoInternetConnection,
  ButtonView,
} from '../../components';
import styles from './styles';
import {Metrics, Colors} from '../../theme';
// import { noInternetText } from "../../constants";
import {HELP} from '../../config/WebService';

class WebViewContainer extends Component {
  state = {
    loading: true,
  };
  render() {
    const {route} = this.props;

    const url =
      this.props.route.name == 'getHelp' ? HELP : route.params.websiteUrl;

    return (
      <View style={styles.container}>
        <WebView
          source={{uri: url}}
          renderLoading={true}
          onLoadEnd={() => {
            this.setState({loading: false});
          }}
          ref={(ref) => {
            this.WebView = ref;
          }}
          renderError={(error) => {
            console.log('error : ', error);
            return <NoInternetConnection />;
          }}
        />
        <Loading loading={this.state.loading} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(WebViewContainer);
