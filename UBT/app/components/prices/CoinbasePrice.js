
import moment from 'moment';

import BasePrice from './BasePrice';


export default class CoinbasePrice extends BasePrice {

  initConstants() {
    this.name = 'Coinbase';
    this.currencyStorageKey = 'price-coinbase-currency';
    this.refreshIntervalStorageKey = 'price-coinbase-refresh-interval';
    this.detailRouteId = 'prices-coinbase-detail';
  }

  async fetchExchangeRates() {
    this.setState({loading: true});
    let response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC');
    let json = await response.json();
    let rates = json.data.rates;
    this.setState({rate: rates[this.state.currency], loading: false, lastUpdated: moment().format('llll')});
  }

}
