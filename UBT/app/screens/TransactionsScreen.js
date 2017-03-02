
import React, { Component } from 'react';
import {
  AsyncStorage,
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


export default class TransactionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      history: []
    }
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.loadHistory();
    });
  }

  async loadHistory() {
    let transactionHistoryTxt = await AsyncStorage.getItem('transaction-history');
    let history = [];

    if (transactionHistoryTxt) history = JSON.parse(transactionHistoryTxt);

    this.setState({history});
    return history;
  }

  showScanner() {
    this.props.navigator.push({
      id: 'scanner',
      props: {
        onScan: (hash) => {
          this.setState({hash});
          setTimeout(() => {
            this.queryTransaction();
          }, 300);
        }
      }
    });
  }

  queryTransaction() {
    if (!this.state.hash || this.state.hash === '') return;

    InteractionManager.runAfterInteractions(() => {
      this.props.navigator.push({
        id: 'transaction-detail',
        props: {
          hash: this.state.hash,
          hashType: 'unknown', // unknown, transaction, address
          onClose: () => {
            this.loadHistory();
          }
        }
      });
    });
  }

  render() {
    return (
      <Container style={{
        backgroundColor: '#FFF',
      }}> 
        <Header>
          <Left>
            <Button transparent onPress={this.props.onOpenDrawer}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Transactions</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Address or Transaction Hash</Label>
              <Input
                onChangeText={(hash) => this.setState({hash})}
                value={this.state.hash}
                />
            </Item>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
              <Button iconLeft light onPress={this.showScanner.bind(this)}>
                <Icon name="qr-scanner"/>
                <Text>QR Scan</Text>
              </Button>
              <Button iconLeft onPress={this.queryTransaction.bind(this)}>
                <Icon name="search"/>
                <Text>Query</Text>
              </Button>
            </View>
            <View>
              <ListItem itemDivider>
                <Body>
                  <Text>History</Text>
                </Body>
                <Right></Right>
              </ListItem>
              {this.state.history.map((history, i) => {
                return (<ListItem key={'history-item-' + i} onPress={() => {
                          this.setState({hash: history.hash});
                          setTimeout(() => {
                            this.queryTransaction();
                          }, 300);
                        }}>
                          <Body>
                            <Text>{history.hash}</Text>
                            <Text note>{history.type} - {history.lastUse}</Text>
                          </Body>
                        </ListItem>);
              })}
            </View>
          </Form>
        </Content>

      </Container>
    );
  }
}
