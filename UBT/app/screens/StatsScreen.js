
import React, { Component } from 'react';
import {
  ActivityIndicator,
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
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  loadingStatus(isLoading) {
    this.setState({loading: isLoading});
  }

  reload() {
    this._statsContainer.refreshStats();
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
            <Title>Statistics</Title>
          </Body>
          <Right>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <ActivityIndicator animating={this.state.loading} size="small" color="white" style={{ marginRight: 10 }} />
              <Button light transparent onPress={this.reload.bind(this)}>
                  <Icon name='refresh' />
              </Button>
            </View>
          </Right>
        </Header>

        <Content>
          <StatsContainer
            ref={(statsContainer) => this._statsContainer = statsContainer}
            navigator={this.props.navigator}
            loadingStatus={this.loadingStatus.bind(this)}
          />
        </Content>
      </Container>
    );
  }
}
