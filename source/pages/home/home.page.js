import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import Header from '../../components/header/header.component';
import HomeContent from '../../components/home-content/home-content.component';
import {checkServer} from '../../configure/api/api.configure.js';

import styles from './home.style';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      state: 1,
    };
  }

  componentDidMount() {
    this.startServer();
  }

  startServer = async () => {
    BackgroundTimer.runBackgroundTimer(async () => {
      await checkServer()
        .then((res) => console.log('Response: ', res))
        .catch((err) => console.log('Error: ', err));
    }, 180000);
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Header navigation={navigation} />
        </View>
        <View style={styles.bodyContainer}>
          <HomeContent navigation={navigation} />
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
