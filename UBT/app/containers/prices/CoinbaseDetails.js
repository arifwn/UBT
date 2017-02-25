
import BaseDetails from './BaseDetails';


export default class CoinDeskDetails extends BaseDetails {
  
  initConstants() {
    this.name = 'Coinbase';
    this.currencyStorageKey = 'price-coinbase-currency';
    this.pickerItemLabel = 'coinbase-currency-item-';
  }

  async fetchCurrencies() {
    let response = await fetch('https://api.coinbase.com/v2/currencies');
    let json = await response.json();
    let currencies = json.data;
    this.setState({currencies, loading: false});
  }
}
