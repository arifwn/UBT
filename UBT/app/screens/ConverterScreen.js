
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


export default class ConverterScreen extends Component {
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
            <Title>Converter</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <Text>
            Converter
          </Text>
        </Content>

        <Footer>
          <FooterTab>
            <Button>
              <Text>OK!</Text>
            </Button>  
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
