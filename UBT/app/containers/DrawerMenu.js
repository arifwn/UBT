
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import { Container, Content, ListItem, Text } from 'native-base';

export default class DrawerMenu extends Component {
  queueShowScreen(screen) {
    setTimeout(() => {
      this.props.onShowScreen(screen);
    }, 0);
  }

  queueCloseDrawer() {
    setTimeout(() => {
      this.props.onCloseDrawer();
    }, 50);
  }

  render() {
    return (
      <Container style={{
        backgroundColor: '#FFF',
      }}>
        <Content>
          <ListItem onPress={() => {
            this.queueShowScreen('home');
            this.queueCloseDrawer();
          }}>
            <Text>Ultimate Bitcoin Toolbox</Text>
          </ListItem>
          <ListItem onPress={() => {
            this.queueShowScreen('prices');
            this.queueCloseDrawer();
          }}>
            <Text>Prices</Text>
          </ListItem>
          <ListItem onPress={() => {
            this.queueShowScreen('news');
            this.queueCloseDrawer();
          }}>
            <Text>News</Text>
          </ListItem>
          <ListItem onPress={() => {
            this.queueShowScreen('transactions');
            this.queueCloseDrawer();
          }}>
            <Text>Transactions</Text>
          </ListItem>
          <ListItem onPress={() => {
            this.queueShowScreen('converter');
            this.queueCloseDrawer();
          }}>
            <Text>Converter</Text>
          </ListItem>
          <ListItem onPress={() => {
            this.queueShowScreen('alerts');
            this.queueCloseDrawer();
          }}>
            <Text>Alerts</Text>
          </ListItem>
          <ListItem onPress={() => {
            this.queueShowScreen('stats');
            this.queueCloseDrawer();
          }}>
            <Text>Stats</Text>
          </ListItem>
          <ListItem onPress={() => {
            this.queueShowScreen('settings');
            this.queueCloseDrawer();
          }}>
            <Text>Settings</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
