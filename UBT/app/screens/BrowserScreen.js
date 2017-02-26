
import React, { Component } from 'react';
import {
  WebView,
  View,
  Linking,
  BackAndroid,
  ActivityIndicator
} from 'react-native';

import {
  Container,
  Header,
  Footer,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body
} from 'native-base';


export default class BrowserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.popNavigation.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.popNavigation.bind(this));
  }

  onNavigationStateChange(navState) {
    this.setState({ loading: navState.loading });
  }

  popNavigation() {
    this.props.navigator.pop();
    return true;
  }

  openLink() {
    Linking
      .openURL(this.props.url)
      .catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <Container style={{
        backgroundColor: '#FFF'
      }}> 
        <View style={{flex: 1}}>
          <WebView
            ref={(ref) => this._webview = ref}
            source={{uri: this.props.url}}
            startInLoadingState={true}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            style={{flex: 1, height: 400}}
          />
        </View>

        <Footer>
          <Left>
            <Button transparent onPress={this.popNavigation.bind(this)}>
                <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator animating={this.state.loading} size="small" color="white" />
              <Button light transparent onPress={this.openLink.bind(this)}>
                  <Icon name='open' />
              </Button>
            </View>
          </Right>
        </Footer>

      </Container>
    );
  }
}
