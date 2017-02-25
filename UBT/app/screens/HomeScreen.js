
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
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
  Body
} from 'native-base';


import PricesContainer from '../containers/PricesContainer';
import NewsContainer from '../containers/NewsContainer';


export default class HomeScreen extends Component {
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
            <Text>Bitcoin Prices</Text>
          </ListItem>
          <PricesContainer navigator={this.props.navigator}/>

          <ListItem itemDivider>
            <Text>News</Text>
          </ListItem>
          <NewsContainer navigator={this.props.navigator}/>
        </Content>

      </Container>
    );
  }
}
