
import React, { Component } from 'react';
import {
  AsyncStorage,
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

    this.getCurrency()
      .then((currency) => {
        this.setState({currency});
        this.fetchExchangeRates();
      });
  }

  initConstants() {
    this.name = 'Name';
    this.currencyStorageKey = 'price-key-currency';
    this.detailRouteId = 'prices-key-detail';
  }

  componentWillMount() {
    this.intervalId = setInterval(() => {
      this.fetchExchangeRates();
    }, 1*60*1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  async getCurrency(defaultCurrency='USD') {
    let currency = await AsyncStorage.getItem(this.currencyStorageKey);
    if (!currency) currency = defaultCurrency;
    return currency;
  }

  async fetchExchangeRates() {
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
