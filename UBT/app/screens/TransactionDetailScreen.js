
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  BackAndroid,
  InteractionManager,
  View
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
  Form,
  Item,
  Label,
  Input
} from 'native-base';

import moment from 'moment';


export default class TransactionDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.popNavigation.bind(this));

    InteractionManager.runAfterInteractions(() => {
      this.load();
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.popNavigation.bind(this));
  }

  popNavigation() {
    this.props.navigator.pop();
    return true;
  }

  async loadHistory() {
    let transactionHistoryTxt = await AsyncStorage.getItem('transaction-history');
    let history = [];

    if (transactionHistoryTxt) history = JSON.parse(transactionHistoryTxt);

    return history;
  }

  async saveHistory(data) {
    let history = await this.loadHistory();

    let newHistory = [];
    let newHistoryItem = {};

    if (data['dataType'] == 'transaction') {
      newHistoryItem = {
        hash: data['hash'],
        type: 'transaction',
        lastUse: moment().format('llll')
      };
      newHistory.push(newHistoryItem);
    }

    if (data['dataType'] == 'address') {
      newHistoryItem = {
        hash: data['address'],
        type: 'address',
        lastUse: moment().format('llll')
      };

      newHistory.push(newHistoryItem);
    }

    for (let i = 0; i < history.length; i++) {
      let item = history[i];
      if (item.hash == newHistoryItem.hash) continue;
      newHistory.push(item);
    }

    console.log('history:', newHistory);
    await AsyncStorage.setItem('transaction-history', JSON.stringify(newHistory));
  }

  async load() {
    this.setState({loading: true});

    if (this.props.hashType == 'transaction') {
      console.log('fetching ', this.props.hashType);
      let data = await this.loadTransaction(this.props.hash);
      this.setState({data, loading: false});
      this.saveHistory(data);
      return data;
    }
    else if (this.props.hashType == 'address') {
      console.log('fetching ', this.props.hashType);
      let data = await this.loadAddress(this.props.hash);
      this.setState({data, loading: false});
      this.saveHistory(data);
      return data;
    }
    else {
      console.log('unknown hash type!', this.props.hashType);
      let loaded = false;
      try {
        let data = await this.loadTransaction(this.props.hash);
        this.setState({data, loading: false});
        this.saveHistory(data);
        return data;
      }
      catch (err) {
        console.log('err', err);
      }

      try {
        let data = await this.loadAddress(this.props.hash);
        this.setState({data, loading: false});
        this.saveHistory(data);
        return data;
      }
      catch (err) {
        console.log('err', err);
      }

      throw new Error('invalid hash:', this.props.hash);
    }
  }

  async loadTransaction(hash) {
    let response = await fetch('https://blockchain.info/rawtx/' + hash);
    let json = await response.json();
    json['dataType'] = 'transaction';
    return json;
  }

  async loadAddress(hash) {
    let response = await fetch('https://blockchain.info/rawaddr/' + hash);
    let json = await response.json();
    json['dataType'] = 'address';
    return json;
  }

  async reload() {
    let result = await this.load();
    return result;
  }

  renderItem(label, value, i) {
    return (<ListItem key={'stats-item-' + i} onPress={() => {}}>
              <Body>
                <Text>{label}</Text>
                <Text note>{value}</Text>
              </Body>
            </ListItem>
            );
  }

  renderTransaction(data) {
    let viewData = [
      { label: "Size", value: data['size'] },
      { label: "Received Time", value: moment.unix(data['time']).format('llll') },
      { label: "Included In Blocks", value: data['block_height'] },
      { label: "Relayed by IP", value: data['relayed_by'] }
    ];

    let inputs = data['inputs'].map((inputData, i) => {
      let btc = inputData['prev_out']['value'] / 100000000;
      let address = inputData['prev_out']['addr'];
      return {
        label: "Input",
        value: `${btc} BTC from ${address}`
      };
    });

    let outputs = data['out'].map((inputData, i) => {
      let btc = inputData['value'] / 100000000;
      let address = inputData['addr'];
      return {
        label: "Output",
        value: `${btc} BTC to ${address}`
      };
    });

    viewData = viewData.concat(inputs, outputs);

    let views = [];
    views.push(<ListItem key={'transaction-header-' + data.hash} itemDivider>
                  <Text>Transaction {data.hash}</Text>
                </ListItem>);
    let detailViews = viewData.map((item, i) => {
      return this.renderItem(item.label, item.value, i);
    });

    return views.concat(detailViews);
  }

  renderAddress(data) {
    let viewData = [
      { label: "Hash 160", value: data['hash160'] },
      { label: "No. Transactions", value: data['n_tx'] },
      { label: "Total Sent", value: data['total_sent'] / 100000000 },
      { label: "Total Received", value: data['total_received'] / 100000000 },
      { label: "Final Balance", value: data['final_balance'] / 100000000 },
    ];

    let views = [];
    views.push(<ListItem key={'address-header-' + data.hash} itemDivider>
                  <Text>Address {data.hash}</Text>
                </ListItem>);

    let detailViews = viewData.map((item, i) => {
      return this.renderItem(item.label, item.value, i);
    });

    let transactionViews = data.txs.map((item, i) => {
      return this.renderTransaction(item);
    });

    return views.concat(detailViews, transactionViews);
  }

  render() {
    let renderedData = null;

    if (this.state.data) {
      if (this.state.data.dataType == 'address') renderedData = this.renderAddress(this.state.data);
      else if (this.state.data.dataType == 'transaction') renderedData = this.renderTransaction(this.state.data);
    }

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
            <Title>Transaction</Title>
          </Body>
          <Right>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <ActivityIndicator animating={this.state.loading} size="small" color="white" style={{ marginRight: 10 }} />
              <Button light transparent onPress={this.reload.bind(this)}>
                <Icon name='refresh' />
              </Button>
            </View>
          </Right>
        </Header>

        <Content>
          {renderedData}
        </Content>

      </Container>
    );
  }
}
