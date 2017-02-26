
import React, { Component } from 'react';
import {
  AsyncStorage,
  InteractionManager
} from 'react-native';

import {
  ListItem,
  Text,
  Left,
  Right,
  Body
} from 'native-base';


import moment from 'moment';


export default class BasePrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currency: null,
      rate: null,
      lastUpdated: null
    }

    this.initConstants();
  }

  initConstants() {
    this.name = 'Name';
    this.currencyStorageKey = 'price-key-currency';
    this.refreshIntervalStorageKey = 'price-key-refresh-interval';
    this.detailRouteId = 'prices-key-detail';
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.initPeriodicFetch();

      this.getCurrency()
        .then((currency) => {
          this.setState({currency});
          this.fetchExchangeRates();
        });
    });

  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  initPeriodicFetch() {
    this.getInterval()
      .then((interval) => {
        this.intervalId = setInterval(() => {
          this.fetchExchangeRates();
        }, interval*1000);
      })
  }

  async getCurrency(defaultCurrency='USD') {
    let currency = await AsyncStorage.getItem(this.currencyStorageKey);
    if (!currency) currency = defaultCurrency;
    return currency;
  }

  async getInterval(defaultInterval=60) {
    let interval = await AsyncStorage.getItem(this.refreshIntervalStorageKey);
    if (interval) {
      interval = JSON.parse(interval);
    }
    else {
      interval = defaultInterval;
    }
    return interval;
  }

  async fetchExchangeRates() {
    // override me
  }

  showDetails() {
    this.props.navigator.push({
      id: this.detailRouteId,
      props: {
        onSave: () => {
          this.getCurrency()
            .then((currency) => {
              this.setState({currency, rate: null});
              this.fetchExchangeRates();
            });
        }
      }
    });
  }

  render() {
    return (
      <ListItem onPress={() => {
        this.showDetails();
      }}>
        <Body>
          <Text>{this.name}</Text>
          {this.state.loading && <Text note>Updating...</Text> }
          {!this.state.loading && <Text note>{this.state.lastUpdated}</Text> }
        </Body>
        <Right>
          {(this.state.rate != null) && <Text>{this.state.rate} {this.state.currency}</Text>}
        </Right>
      </ListItem>
    );
  }
}
