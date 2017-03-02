
import React, { Component } from 'react';
import {
  BackAndroid,
  View,
  Dimensions
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

import Camera from 'react-native-camera';


export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.popNavigation.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.popNavigation.bind(this));
  }

  popNavigation() {
    this.props.navigator.pop();
    return true;
  }

  onBarCodeRead(e) {
    let code = e.data;
    console.log('onBarCodeRead', code);
    this.popNavigation();
    if (this.props.onScan) this.props.onScan(code);
  }

  render() {
    return (
      <Container style={{
        backgroundColor: '#FFF',
      }}> 
        <Camera
          ref={(camera) => {
            this._camera = camera;
          }}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
        >
        </Camera>
      </Container>
    );
  }
}
