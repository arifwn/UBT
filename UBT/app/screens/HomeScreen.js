
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
            <Button transparent onPress={this.props.onOpenDrawer}>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>

        <Content>
          <ListItem itemDivider>
            <Body>
              <Text>Bitcoin Prices</Text>
            </Body>
            <Right/>
          </ListItem>
          <PricesContainer navigator={this.props.navigator}/>

          <ListItem itemDivider>
            <Body>
              <Text>News</Text>
            </Body>
            <Right>
              <ActivityIndicator animating={this.state.newsLoading} size="small" />
            </Right>
          </ListItem>
          <NewsContainer navigator={this.props.navigator} loadingStatus={this.newsLoadingStatus.bind(this)} />

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
