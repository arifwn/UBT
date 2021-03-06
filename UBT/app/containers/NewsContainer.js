
import React, { Component } from 'react';
import {
  AsyncStorage,
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

import { DOMParser }  from 'xmldom-silent';
import moment from 'moment';

export default class NewsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsSources: [
        {name: '99Bitcoins', id: '99_bitcoins', url: 'https://99bitcoins.com/feed/', limit: 6},
        {name: 'Bitcoin Magazine', id: 'bitcoin_magazine', url: 'https://bitcoinmagazine.com/feed/', limit: 6},
        {name: 'CoinDesk', id: 'coindesk', url: 'https://feeds.feedburner.com/CoinDesk', limit: 6},
        {name: 'Cryptocoins News', id: 'cryptocoins_news', url: 'https://www.cryptocoinsnews.com/feed/', limit: 6},
        {name: 'r/bitcoin', id: 'r_bitcoin', url: 'https://www.reddit.com/r/bitcoin/top/.rss', limit: 6, type: 'atom10'},
        {name: 'r/btc', id: 'r_btc', url: 'https://www.reddit.com/r/btc/top/.rss', limit: 6, type: 'atom10'},
      ],
      enabledSources: {},
      articles: []
    }
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refreshNews();
    });
  }

  async loadNewsConfig() {
    let enabledSourcesTxt = await AsyncStorage.getItem('enabled-news-sources');
    let enabledSources = {
      'cryptocoins_news': true
    };

    if (enabledSourcesTxt) enabledSources = JSON.parse(enabledSourcesTxt);

    this.setState({enabledSources});
    return enabledSources;
  }

  enabledNewsSources() {
    let sources = [];
    for (let i = 0; i < this.state.newsSources.length; i++) {
      let source = this.state.newsSources[i];
      if (this.state.enabledSources[source.id]) {
        sources.push(source)
      }
    }

    return sources;
  }

  async refreshNews() {
    if (this.props.loadingStatus) this.props.loadingStatus(true);

    let config = await this.loadNewsConfig();
    let newsSources = this.enabledNewsSources();

    let articles = [];
    for (let i = 0; i < newsSources.length; i++) {
      let source = newsSources[i];
      let _articles = await this.fetchNews(source);
      articles = articles.concat(_articles);
      this.setState({articles: articles});
    }

    if (this.props.loadingStatus) this.props.loadingStatus(false);
    return articles;
  }

  parseAtom(doc, source) {
    let title = doc.getElementsByTagName('title')[0];
    let link = doc.getElementsByTagName('link')[0];
    let pubDate = doc.getElementsByTagName('pubDate')[0];
    let description = doc.getElementsByTagName('description')[0];

    let article = {
      title: title.textContent,
      source: source.name,
      link: link.textContent,
      pubDate: moment(pubDate.textContent, 'ddd, DD MMM YYYY HH:mm:ss Z').format('llll'),
      description: description.textContent,
    }
    return article;
  }

  parseAtom10(doc, source) {
    let title = doc.getElementsByTagName('title')[0];
    let link = doc.getElementsByTagName('link')[0];
    let pubDate = doc.getElementsByTagName('updated')[0];
    let description = doc.getElementsByTagName('content')[0];

    let article = {
      title: title.textContent,
      source: source.name,
      link: link.getAttribute('href'),
      pubDate: moment(pubDate.textContent).format('llll'),
      description: description.textContent,
    }
    return article;
  }

  async fetchNews(source) {
    let response = await fetch(source.url);
    let feedXml = await response.text();

    let parsedXml;
    try {
      parsedXml = new DOMParser().parseFromString(feedXml, 'text/xml');
    }
    catch (err) {
      console.log('err', err);
    }

    if (!parsedXml) return;

    let items;
    if (source.type == 'atom10') {
      items = parsedXml.documentElement.getElementsByTagName('entry');
    }
    else {
       items = parsedXml.documentElement.getElementsByTagName('item');
    }

    let articles = [];

    for (let i = 0; i < items.length; i++) {
      if (i >= source.limit) break;

      let item = items[i];
      let article;
      if (source.type == 'atom10') {
        article = this.parseAtom10(item, source);
      }
      else {
        article = this.parseAtom(item, source);
      }

      articles.push(article);
    }

    return articles;
  }

  openArticle(article) {
    this.props.navigator.push({
      id: 'browser',
      props: {
        title: article.source,
        url: article.link
      }
    });
  }

  render() {
    return (
      <View>
        {this.state.articles.map((article, i) => {
          return (<ListItem key={'news-item-' + i} onPress={() => {
                    this.openArticle(article);
                  }}>
                    <Body>
                      <Text>{article.title}</Text>
                      <Text note>{article.source} - {article.pubDate}</Text>
                    </Body>
                  </ListItem>);
        })}
      </View>
    );
  }
}
