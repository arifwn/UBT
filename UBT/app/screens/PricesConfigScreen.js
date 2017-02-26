
import React, { Component } from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  BackAndroid,
  View,
  Switch,
  InteractionManager
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body,
  ListItem
} from 'native-base';



export default class PricesConfigScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricesSources: [
        {name: 'Coinbase', id: 'coinbase'},
        {name: 'CoinDesk', id: 'coindesk'},
      ],
      enabledSources: {},
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.popNavigation.bind(this));

    InteractionManager.runAfterInteractions(() => {
      this.loadConfig();
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.popNavigation.bind(this));
  }

  isSourceActive(source) {
    if (this.state.enabledSources[source.id]) return true;
    return false;
  }

  addSource(source) {
    let enabledSources = this.state.enabledSources;
    enabledSources[source.id] = true;
    this.setState({enabledSources});
  }

  removeSource(source) {
    let enabledSources = this.state.enabledSources;
    delete enabledSources[source.id];
    this.setState({enabledSources});
  }

  async loadConfig() {
    let enabledSourcesTxt = await AsyncStorage.getItem('enabled-prices-sources');
    let enabledSources = {
      'coinbase': true
    };

    if (enabledSourcesTxt) enabledSources = JSON.parse(enabledSourcesTxt);

    this.setState({enabledSources});
    return enabledSources;
  }

  async saveConfig() {
    let enabledSourcesTxt = JSON.stringify(this.state.enabledSources);
    let result = await AsyncStorage.setItem('enabled-prices-sources', enabledSourcesTxt);

    return this.state.enabledSources;
  }

  onSave() {
    this.saveConfig()
      .then(() => {
        this.props.navigator.pop();
        if (this.props.onSave) this.props.onSave();
      })

    return true;
  }

  popNavigation() {
    this.props.navigator.pop();
    return true;
  }

  render() {
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
            <Title>Price Sources</Title>
          </Body>
          <Right>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button light transparent onPress={this.onSave.bind(this)}>
                  <Icon name='checkmark' />
              </Button>
            </View>
          </Right>
        </Header>

        <Content>
          {this.state.pricesSources.map((source, i) => {
            return (
              <ListItem key={'price-source-item-' + i}>
                <Body>
                  <Text>
                    {source.name}
                  </Text>
                </Body>
                <Right>
                  <Switch
                    onValueChange={(value) => {
                      if (value) this.addSource(source);
                      else this.removeSource(source);
                    }}
                    value={this.isSourceActive(source)}
                  />
                </Right>
              </ListItem>
            );
          })}
        </Content>

      </Container>
    );
  }
}
