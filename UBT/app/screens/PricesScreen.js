
import React, { Component } from 'react';
import {
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


export default class PricesScreen extends Component {

  showSettings() {
    this.props.navigator.push({
      id: 'prices-config',
      props: {
        onSave: () => {
          this._pricesContainer.loadConfig();
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
            <Title>Prices</Title>
          </Body>
          <Right>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button light transparent onPress={this.showSettings.bind(this)}>
                  <Icon name='settings' />
              </Button>
            </View>
          </Right>
        </Header>

        <Content>
          <PricesContainer
            ref={(pricesContainer) => { this._pricesContainer = pricesContainer }}
            navigator={this.props.navigator}
          />
        </Content>
      </Container>
    );
  }
}
