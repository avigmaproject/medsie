import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import ManageStoreList from '../../components/manage-store-list/manage-store-list.component';
import BackHeader from '../../components/back-header/back-header.component';
import {managedStore} from '../../configure/api/api.configure';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/loader/loader.component';

import styles from './managed-store.style';

class ManagedStore extends Component {
  constructor() {
    super();
    this.state = {
      isLoader: false,
      list: [],
      access_token: null,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.getLatLong();
    });
  }
  getLatLong = async () => {
    const value = await AsyncStorage.multiGet([
      'latitude',
      'longitude',
      'access_token',
    ]);
    const currentLatitude = JSON.parse(value[0][1]);
    const currentLongitude = JSON.parse(value[1][1]);
    const access_token = await JSON.parse(value[2][1]);
    this.setState(
      {
        currentLatitude: currentLatitude,
        currentLongitude: currentLongitude,
        access_token: access_token,
      },
      () => this.manageData(),
    );
  };

  manageData = async () => {
    this.setState({isLoader: true});
    console.log('access_token_minal2', this.state.access_token);
    const data = JSON.stringify({
      Type: 1,
    });
    await managedStore(data, this.state.access_token)
      .then((res) => {
        console.log('Manage: ', res);
        this.setState({list: res[0]});
        this.setState({isLoader: false});
      })
      .catch((error) => console.log('Error in data: ', error));
  };

  render() {
    const {list, isLoader} = this.state;
    const {navigation} = this.props;
    console.log('access_token_minal', this.state.access_token);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Loader isLoader={isLoader} />
          <BackHeader title="Back" navigation={navigation} />
          {list.length === 0 && (
            <View style={{justifyContent: 'center', marginLeft: 20}}>
              <Text style={{fontSize: 20}}>No Store Found</Text>
            </View>
          )}
          <ManageStoreList list={list} navigation={navigation} />
        </View>
      </SafeAreaView>
    );
  }
}

export default ManagedStore;
