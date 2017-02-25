
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  WebView
} from 'react-native';

import CoinbasePrice from '../components/prices/CoinbasePrice';
import CoinDeskPrice from '../components/prices/CoinDeskPrice';

let chartHtml = require('../components/prices/chart.html');

export default class PricesContainer extends Component {
  onNavigationStateChange(navigator) {
    if (navigator.url.includes('components/prices/chart.html')) {
      return true;
    }
    else{
      console.log(navigator.url);
      this._webview.stopLoading();
      return false;
     }
  }

  render() {
    return (
      <View>
        <WebView
          ref={(ref) => this._webview = ref}
          source={chartHtml}
          style={{alignSelf: 'stretch', height: 300}}
          onNavigationStateChange ={this.onNavigationStateChange.bind(this)}
        />
        <CoinbasePrice navigator={this.props.navigator}/>
        <CoinDeskPrice navigator={this.props.navigator}/>
      </View>
    );
  }
}
