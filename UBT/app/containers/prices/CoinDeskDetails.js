
import BaseDetails from './BaseDetails';


export default class CoinDeskDetails extends BaseDetails {
  
  initConstants() {
    this.name = 'CoinDesk';
    this.currencyStorageKey = 'price-coindesk-currency';
    this.refreshIntervalStorageKey = 'price-coindesk-refresh-interval';
    this.pickerItemLabel = 'coindesk-currency-item-';
  }

  async fetchCurrencies() {
    let response = await fetch('http://api.coindesk.com/v1/bpi/supported-currencies.json');
    let json = await response.json();
    let currencies = json.map((currency) => { return {id: currency.currency, name: currency.country} });
    this.setState({currencies, loading: false});
  }
}
