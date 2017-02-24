
import React, { Component } from 'react';

import {
  StyleSheet,
  Navigator
} from 'react-native';

import {
  Drawer
} from 'native-base';

import DrawerMenu from './containers/DrawerMenu';

import HomeScreen from './screens/HomeScreen';
import PricesScreen from './screens/PricesScreen';
import NewsScreen from './screens/NewsScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import ConverterScreen from './screens/ConverterScreen';
import AlertsScreen from './screens/AlertsScreen';
import StatsScreen from './screens/StatsScreen';
import SettingsScreen from './screens/SettingsScreen';


export default class UBT extends Component {
  constructor(props) {
    super(props);
  }

  closeDrawer() {
    this._drawer._root.close();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  showScreen(screen) {
    this._navigator.resetTo({id: screen});
  }

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'home':
        return (<HomeScreen key="home-screen" onOpenDrawer={this.openDrawer.bind(this)} navigator={this._navigator} />);
      case 'prices':
        return (<PricesScreen key="prices-screen" onOpenDrawer={this.openDrawer.bind(this)} navigator={this._navigator} />);
      case 'news':
        return (<NewsScreen key="news-screen" onOpenDrawer={this.openDrawer.bind(this)} navigator={this._navigator} />);
      case 'transactions':
        return (<TransactionsScreen key="transactions-screen" onOpenDrawer={this.openDrawer.bind(this)} navigator={this._navigator} />);
      case 'converter':
        return (<ConverterScreen key="converter-screen" onOpenDrawer={this.openDrawer.bind(this)} navigator={this._navigator} />);
      case 'alerts':
        return (<AlertsScreen key="alerts-screen" onOpenDrawer={this.openDrawer.bind(this)} navigator={this._navigator} />);
      case 'stats':
        return (<StatsScreen key="stats-screen" onOpenDrawer={this.openDrawer.bind(this)} navigator={this._navigator} />);
      case 'settings':
        return (<SettingsScreen key="settings-screen" onOpenDrawer={this.openDrawer.bind(this)} navigator={this._navigator} />);
      default:
        return (<HomeScreen key="home-screen" onOpenDrawer={this.openDrawer.bind(this)} navigator={this._navigator} />);
    }
  }

  navigatorConfigureScene(route, routeStack) {
    if (route.type == 'modal') return Navigator.SceneConfigs.FloatFromBottom;

    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    return (
      <Drawer
        content={<DrawerMenu onCloseDrawer={this.closeDrawer.bind(this)} onShowScreen={this.showScreen.bind(this)} />}
        tweenDuration={150}
        ref={(ref) => this._drawer = ref}
      >
        <Navigator
          initialRoute={{id: 'home'}}
          renderScene={this.navigatorRenderScene.bind(this)}
          configureScene={this.navigatorConfigureScene.bind(this)}
          ref={(ref) => this._navigator = ref}
        />
      </Drawer>
    );
  }
}
