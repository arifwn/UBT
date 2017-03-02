
import React, { Component } from 'react';
import {
  View,
  ActivityIndicator
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
  Body
} from 'native-base';


import PricesContainer from '../containers/PricesContainer';
import NewsContainer from '../containers/NewsContainer';
import StatsContainer from '../containers/StatsContainer';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsLoading: true,
      statsLoading: true
    }
  }

  newsLoadingStatus(isLoading) {
    this.setState({newsLoading: isLoading});
  }

  statsLoadingStatus(isLoading) {
    this.setState({statsLoading: isLoading});
  }

  showPricesSettings() {
    this.props.navigator.push({
      id: 'prices-config',
      props: {
        onSave: () => {
          this._pricesContainer.loadConfig();
        }
      }
    });
  }

  showNewsSettings() {
    this.props.navigator.push({
      id: 'news-config',
      props: {
        onSave: () => {
          this._newsContainer.refreshNews();
        }
      }
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
            <Title>Overview</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <Content>
          <ListItem itemDivider>
            <Body>
              <Text>Bitcoin Prices</Text>
            </Body>
            <Right>
              <Button transparent small dark onPress={this.showPricesSettings.bind(this)}>
                <Icon name='settings' />
              </Button>
            </Right>
          </ListItem>
          <PricesContainer
            ref={(pricesContainer) => { this._pricesContainer = pricesContainer }}
            navigator={this.props.navigator}
          />

          <ListItem itemDivider>
            <Body>
              <Text>News</Text>
            </Body>
            <Right>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ActivityIndicator animating={this.state.newsLoading} size="small" />
                <Button transparent small dark onPress={this.showNewsSettings.bind(this)}>
                    <Icon name='settings' />
                </Button>
              </View>
            </Right>
          </ListItem>
          <NewsContainer
            ref={(newsContainer) => { this._newsContainer = newsContainer }}
            navigator={this.props.navigator}
            loadingStatus={this.newsLoadingStatus.bind(this)}
          />

          <ListItem itemDivider>
            <Body>
              <Text>Stats</Text>
            </Body>
            <Right>
              <ActivityIndicator animating={this.state.statsLoading} size="small" />
            </Right>
          </ListItem>
          <StatsContainer navigator={this.props.navigator} loadingStatus={this.statsLoadingStatus.bind(this)}/>
        </Content>

      </Container>
    );
  }
}
