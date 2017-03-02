
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



export default class NewsConfigScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsSources: [
        {name: '99Bitcoins', id: '99_bitcoins', url: 'https://99bitcoins.com/feed/', limit: 6},
        {name: 'Bitcoin Magazine', id: 'bitcoin_magazine', url: 'https://bitcoinmagazine.com/feed/', limit: 6},
        {name: 'CoinDesk', id: 'coindesk', url: 'https://feeds.feedburner.com/CoinDesk', limit: 6},
        {name: 'Cryptocoins News', id: 'cryptocoins_news', url: 'https://www.cryptocoinsnews.com/feed/', limit: 6},
        {name: 'r/bitcoin', id: 'r_bitcoin', url: 'https://www.reddit.com/r/bitcoin/top/.rss', limit: 6, type: 'atom10'},
        {name: 'r/btc', id: 'r_btc', url: 'https://www.reddit.com/r/btc/top/.rss', limit: 6, type: 'atom10'},
      ],
      enabledSources: {},
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.popNavigation.bind(this));

    InteractionManager.runAfterInteractions(() => {
      this.loadNewsConfig();
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

  async loadNewsConfig() {
    let enabledSourcesTxt = await AsyncStorage.getItem('enabled-news-sources');
    let enabledSources = {
      'cryptocoins_news': true
    };

    if (enabledSourcesTxt) enabledSources = JSON.parse(enabledSourcesTxt);

    this.setState({enabledSources});
    return enabledSources;
  }

  async saveNewsConfig() {
    let enabledSourcesTxt = JSON.stringify(this.state.enabledSources);
    let result = await AsyncStorage.setItem('enabled-news-sources', enabledSourcesTxt);

    return this.state.enabledSources;
  }

  onSave() {
    this.saveNewsConfig()
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
            <Title>News Sources</Title>
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
          {this.state.newsSources.map((source, i) => {
            return (
              <ListItem key={'news-source-item-' + i}>
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
