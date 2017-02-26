
import React, { Component } from 'react';
import {
  View,
  InteractionManager
} from 'react-native';

import {
  ListItem,
  Text,
  Left,
  Right,
  Body
} from 'native-base';


export default class StatsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: []
    }
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refreshStats();
    });
  }

  async refreshStats() {
    if (this.props.loadingStatus) this.props.loadingStatus(true);

    let response = await fetch('https://api.blockchain.info/stats');
    let data = await response.json();

    let stats = [];
    Object.entries(data).forEach((item) => {
      stats.push({key: item[0], label: this.getLabel(item[0]), value: item[1]});
    });

    this.setState({stats});

    if (this.props.loadingStatus) this.props.loadingStatus(false);
  }

  getLabel(key) {
    let labels = {
      market_price_usd: "Market Price (USD)",
      hash_rate: "Hash Rate",
      total_fees_btc: "Total Fees (BTC)",
      n_btc_mined: "Total BTC Mined",
      n_tx: "Total Transactions",
      n_blocks_mined: "Total Blocks Mined",
      minutes_between_blocks: "Minutes Between Blocks",
      totalbc: "Total Bitcoins in Circulation",
      n_blocks_total: "Total Blocks",
      estimated_transaction_volume_usd: "Estimated Transaction Volume (USD)",
      blocks_size: "Blocks Size",
      miners_revenue_usd: "Miners Revenue (USD)",
      nextretarget: "Block Height of The Next Difficulty Retarget",
      difficulty: "Difficulty",
      estimated_btc_sent: "Estimated Bitcoins Sent",
      miners_revenue_btc: "Miners Revenue (BTC)",
      total_btc_sent: "Total Bitcoins Sent",
      trade_volume_btc: "Trade Volume (BTC)",
      trade_volume_usd: "Trade Volume (USD)",
      timestamp: "Timestamp"
    };

    let label = labels[key];
    if (!label) label = key;
    return label;
  }

  render() {
    return (
      <View>
        {this.state.stats.map((statItem, i) => {
          return (<ListItem key={'stats-item-' + i} onPress={() => {}}>
                    <Body>
                      <Text>{statItem.label}</Text>
                      <Text note>{statItem.value}</Text>
                    </Body>
                  </ListItem>
                  );
        })}
      </View>
    );
  }
}
