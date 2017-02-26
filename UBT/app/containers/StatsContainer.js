
import React, { Component } from 'react';
import {
  View
} from 'react-native';

export default class StatsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.refreshStats();
  }

  refreshStats() {
    if (this.props.loadingStatus) this.props.loadingStatus(false);
  }

  render() {
    return (
      <View>
      </View>
    );
  }
}
