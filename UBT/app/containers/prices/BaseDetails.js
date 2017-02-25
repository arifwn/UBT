
import React, { Component } from 'react';
import {
  AsyncStorage,
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
      currency: null,
      currencies: []
    }

    this.initConstants();

    this.getCurrency()
      .then((currency) => this.setState({currency}));

    this.fetchCurrencies();
  }

  initConstants() {
    this.name = 'Name';
    this.currencyStorageKey = 'price-key-currency';
    this.pickerItemLabel = 'key-currency-item-';
  }

  async getCurrency(defaultCurrency='USD') {
    let currency = await AsyncStorage.getItem(this.currencyStorageKey);
    if (!currency) currency = defaultCurrency;
    return currency;
  }

  async setCurrency(currency) {
    let result = await AsyncStorage.setItem(this.currencyStorageKey, currency);
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
  }

  async saveChanges() {
    if (this.state.currency) {
      await this.setCurrency(this.state.currency);
    }

    if (this.props.onSave) this.props.onSave();

    this.props.navigator.pop();
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
        </Content>

      </Container>
    );
  }
}
