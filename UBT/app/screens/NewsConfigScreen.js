
import React, { Component } from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  BackAndroid,
  View,
  Switch
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
        {name: 'Cryptocoins News', url: 'https://www.cryptocoinsnews.com/feed/', limit: 5},
      ],
      availableNewsSources: [
        {name: 'Cryptocoins News', url: 'https://www.cryptocoinsnews.com/feed/', limit: 5},
        {name: 'CoinDesk', url: 'https://feeds.feedburner.com/CoinDesk', limit: 5},
        {name: 'Bitcoin Magazine', url: 'https://bitcoinmagazine.com/feed/', limit: 5},
        {name: '99Bitcoins', url: 'https://99bitcoins.com/feed/', limit: 5},
        {name: 'r/btc', url: 'https://www.reddit.com/r/btc/top/.rss', limit: 5, type: 'atom10'},
      ],
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.popNavigation.bind(this));

    this.loadNewsConfig();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.popNavigation.bind(this));
  }

  isSourceActive(source) {
    for (let i = 0; i < this.state.newsSources.length; i++) {
      let s = this.state.newsSources[i];
      if (source.name === s.name) return true;
    }
    return false;
  }

  addSource(source) {
    for (let i = 0; i < this.state.newsSources.length; i++) {
      let s = this.state.newsSources[i];
      if (source.name === s.name) return;
    }

    let newsSources = this.state.newsSources.slice();
    newsSources.push(source);
    this.setState({newsSources});
  }

  removeSource(source) {
    let newsSources = [];
    for (let i = 0; i < this.state.newsSources.length; i++) {
      let s = this.state.newsSources[i];
      if (source.name === s.name) {
        continue;
      }
      newsSources.push(s);
    }

    this.setState({newsSources});
  }

  async loadNewsConfig() {
    let newsSourcesTxt = await AsyncStorage.getItem('news-sources-config');
    let newsSources = [
      {name: 'Cryptocoins News', url: 'https://www.cryptocoinsnews.com/feed/', limit: 5}
    ];

    if (newsSourcesTxt) newsSources = JSON.parse(newsSourcesTxt);

    this.setState({newsSources});
    return newsSources;
  }

  async saveNewsConfig() {
    let newsSourcesTxt = JSON.stringify(this.state.newsSources);
    let result = await AsyncStorage.setItem('news-sources-config', newsSourcesTxt);

    return this.state.newsSources;
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
          {this.state.availableNewsSources.map((source, i) => {
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
