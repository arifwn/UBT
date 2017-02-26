
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
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body
} from 'native-base';

import NewsContainer from '../containers/NewsContainer';

export default class NewsScreen extends Component {
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
    this._newsContainer.refreshNews();
  }

  showSettings() {
    this.props.navigator.push({
      id: 'news-config',
      props: {
        onSave: () => {
          this.reload();
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
            <Title>News</Title>
          </Body>
          <Right>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <ActivityIndicator animating={this.state.loading} size="small" color="white" style={{ marginRight: 10 }} />
              <Button light transparent onPress={this.reload.bind(this)}>
                  <Icon name='refresh' />
              </Button>
              <Button light transparent onPress={this.showSettings.bind(this)}>
                  <Icon name='settings' />
              </Button>
            </View>
          </Right>
        </Header>

        <Content>
          <NewsContainer
            ref={(newsContainer) => this._newsContainer = newsContainer}
            navigator={this.props.navigator}
            loadingStatus={this.loadingStatus.bind(this)}
          />
        </Content>

      </Container>
    );
  }
}
