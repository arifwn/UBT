
import React, { Component } from 'react';
import {
  AsyncStorage,
  Slider,
  BackAndroid
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Picker,
  Item
} from 'native-base';


export default class BaseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshInterval: 60,
      currency: null,
      currencies: []
    }

    this.initConstants();

    this.getCurrency()
      .then((currency) => this.setState({currency}));

    this.getInterval()
      .then((refreshInterval) => this.setState({refreshInterval}));

    this.fetchCurrencies();
  }

  initConstants() {
    this.name = 'Name';
    this.currencyStorageKey = 'price-key-currency';
    this.refreshIntervalStorageKey = 'price-key-refresh-interval';
    this.pickerItemLabel = 'key-currency-item-';
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.popNavigation.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.popNavigation.bind(this));
  }

  async getCurrency(defaultCurrency='USD') {
    let currency = await AsyncStorage.getItem(this.currencyStorageKey);
    if (!currency) currency = defaultCurrency;
    return currency;
  }

  async setCurrency(currency) {
    let result = await AsyncStorage.setItem(this.currencyStorageKey, currency);
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

  async setInterval(interval) {
    let result = await AsyncStorage.setItem(this.refreshIntervalStorageKey, JSON.stringify(interval));
  }

  async fetchCurrencies() {
    // override me
  }

  onValueChange (value) {
    this.setState({
      currency: value
    });
  }

  popNavigation() {
    this.props.navigator.pop();
    return true;
  }

  async saveChanges() {
    if (this.state.currency) {
      await this.setCurrency(this.state.currency);
      await this.setInterval(this.state.refreshInterval);
    }

    if (this.props.onSave) this.props.onSave();

    this.props.navigator.pop();
  }

  onRefreshIntervalChange(refreshInterval) {
    this.setState({refreshInterval});
  }

  render() {
    let currenciesLabel = 'Currency';
    if (this.state.loading) currenciesLabel = 'Fetching available currencies. Please wait...';

    return (
      <Container style={{
        backgroundColor: '#FFF',
      }}> 
        <Header>
          <Left>
            <Button transparent onPress={this.popNavigation.bind(this)}>
                <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.name}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.saveChanges.bind(this)}>
                <Icon name='checkmark' />
            </Button>
          </Right>
        </Header>

        <Content>
          <ListItem>
            <Body>
              <Text>{currenciesLabel}</Text>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.currency}
                onValueChange={this.onValueChange.bind(this)}>
                {this.state.currencies.map((currency) => <Item label={currency.name} value={currency.id} key={this.pickerItemLabel + currency.id} />)}
              </Picker>
              </Body>
          </ListItem>

          <ListItem>
            <Body>
              <Text>Refresh Interval ({this.state.refreshInterval}s)</Text>
              <Slider step={1} minimumValue={5} maximumValue={300} value={this.state.refreshInterval} onValueChange={this.onRefreshIntervalChange.bind(this)} />
            </Body>
          </ListItem>
        </Content>

      </Container>
    );
  }
}
