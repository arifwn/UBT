
import moment from 'moment';

import BasePrice from './BasePrice';


export default class CoinDeskPrice extends BasePrice {

  initConstants() {
    this.name = 'CoinDesk';
    this.currencyStorageKey = 'price-coindesk-currency';
    this.refreshIntervalStorageKey = 'price-coindesk-refresh-interval';
    this.detailRouteId = 'prices-coindesk-detail';
  }

  async fetchExchangeRates() {
    this.setState({loading: true});
    let response = await fetch('http://api.coindesk.com/v1/bpi/currentprice/' + this.state.currency + '.json');
    let json = await response.json();
    let rate = json.bpi[this.state.currency].rate_float;
    this.setState({rate, loading: false, lastUpdated: moment().format('llll')});
  }
}
