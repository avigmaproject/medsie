import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ListPageComponent from '../../components/list-page-component/list-page-component.component';
import BackHeader from '../../components/back-header/back-header.component';
import {getBusinessListData} from '../../configure/api/api.configure';

import styles from './list-page.style';
import Loader from '../../components/loader/loader.component';

class ListPage extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      currentLatitude: 0,
      currentLongitude: 0,
      locationStatus: '',
      access_token: '',
      isLoader: false,
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;
    navigation.addListener('focus', () => {
      this.setState({isLoader: true}, () => this.getLatLong());
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
    const access_token = JSON.parse(value[2][1]);
    this.setState(
      {
        currentLatitude: currentLatitude,
        currentLongitude: currentLongitude,
        access_token: access_token,
      },
      () => this.homeData(),
    );
  };

  homeData = async () => {
    const {id, type} = this.props.route.params;
    const {
      currentLatitude,
      currentLongitude,
      locationStatus,
      access_token,
    } = this.state;
    const data = JSON.stringify({
      Type: type,
      Buss_CatId: id,
      Buss_Lat: currentLatitude,
      Buss_Long: currentLongitude,
    });
    await getBusinessListData(data, access_token)
      .then((response) => {
        this.setState({array: response[0]}, () => {
          this.setState({isLoader: false});
        });
        console.log('Desc: ', JSON.stringify(response[0]));
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({
          isLoader: false,
        });
      });
  };

  showMap = (type) => (
    <View>
      <TouchableOpacity
        style={styles.showMap}
        onPress={() =>
          this.props.navigation.navigate('ShowMaps', {
            id: this.props.route.params.id,
            type: type,
          })
        }>
        <Text style={styles.title}>Show Map</Text>
      </TouchableOpacity>
    </View>
  );

  title = (type) => (
    <View>
      <View style={styles.titleView}>{this.showMap(type)}</View>
    </View>
  );

  render() {
    const {navigation} = this.props;
    const {array, isLoader} = this.state;
    const {type} = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <BackHeader title="Back" navigation={navigation} />
          {this.title(type)}
        </View>
        <ListPageComponent list={array} navigation={navigation} />
        <Loader isLoader={isLoader} />
      </SafeAreaView>
    );
  }
}

export default ListPage;
