
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

import StatsContainer from '../containers/StatsContainer';


export default class StatsScreen extends Component {
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
            <Title>Stats</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <StatsContainer navigator={this.props.navigator}/>
        </Content>
      </Container>
    );
  }
}
