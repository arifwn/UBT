
import React, { Component } from 'react';
import {
  View,
  WebView,
  InteractionManager,
  AsyncStorage
} from 'react-native';

import CoinbasePrice from '../components/prices/CoinbasePrice';
import CoinDeskPrice from '../components/prices/CoinDeskPrice';

let chartHtml = require('../components/prices/chart.html');

export default class PricesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricesSources: [
        {name: 'Coinbase', id: 'coinbase', component: CoinbasePrice},
        {name: 'CoinDesk', id: 'coindesk', component: CoinDeskPrice},
      ],
      enabledSources: {},
    }
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.loadConfig();
    });
  }

  async loadConfig() {
    let enabledSourcesTxt = await AsyncStorage.getItem('enabled-prices-sources');
    let enabledSources = {
      'coinbase': true
    };

    if (enabledSourcesTxt) enabledSources = JSON.parse(enabledSourcesTxt);

    this.setState({enabledSources});
    return enabledSources;
  }

  enabledSources() {
    let sources = [];
    for (let i = 0; i < this.state.pricesSources.length; i++) {
      let source = this.state.pricesSources[i];
      if (this.state.enabledSources[source.id]) {
        sources.push(source)
      }
    }

    return sources;
  }

  createEnabledSources() {
    let components = this.enabledSources().map((source, i) => {
      return React.createElement(source.component, {key: 'price-item-' + i, navigator: this.props.navigator});
    });

    return components;
  }

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
        { this.createEnabledSources() }
      </View>
    );
  }
}
