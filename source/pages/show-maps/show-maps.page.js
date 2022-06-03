import React, {Component} from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Card, Text, Caption} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import BackHeader from '../../components/back-header/back-header.component';
import CompanyCard from '../../components/company-card/company-card.component';
import ActionButtons from '../../components/action-button/action-button.component';
import {getBusinessListData} from '../../configure/api/api.configure';
import Loader from '../../components/loader/loader.component';

import LogoMarker from '../../assets/svg-files/marker.svg';

import styles from './show-maps.style';

class ShowMaps extends Component {
  initialState = {
    data: '',
    show: false,
    longitudeDelta: 0.5,
    latitudeDelta: 0.5,
    isLoader: false,
    array: [],
    count: 1,
    currentLatitude: '',
    currentLongitude: '',
  };
  constructor() {
    super();
    this.state = {
      ...this.initialState,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.setState(this.initialState);
      this.setState({isLoader: true}, () => this.getLatLong());
    });
  }
  incrementCounter() {
    this.setState(
      {
        count: this.state.count + 1,
      },
      () => this.mapData(),
    );
  }
  decrementCounter() {
    if (this.state.count > 1) {
      this.setState(
        {
          count: this.state.count - 1,
        },
        () => this.mapData(),
      );
    }
  }
  getLatLong = async () => {
    const lt = await AsyncStorage.getItem('latitude');
    const lg = await AsyncStorage.getItem('longitude');
    const at = await AsyncStorage.getItem('access_token');

    this.setState(
      {
        currentLatitude: parseFloat(lt),
        currentLongitude: parseFloat(lg),
        access_token: at,
      },
      () => this.mapData(),
    );
  };

  mapData = async () => {
    const {id, type} = this.props.route.params;
    console.log('Route: ', type);
    const {
      currentLatitude,
      currentLongitude,
      locationStatus,
      access_token,
      count,
    } = this.state;

    const data = JSON.stringify({
      Type: type,
      Buss_CatId: id,
      Buss_Lat: currentLatitude,
      Buss_Long: currentLongitude,
      Pagenumber: count,
    });
    // console.log('getBusinessListData', data);
    await getBusinessListData(data, access_token)
      .then((response) => {
        // console.log('rsponcegetBusinessListData', response);
        this.setState({array: response[0], isLoader: false});
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({isLoader: false});
      });
  };

  marker = () => {
    const {route} = this.props;
    const {array} = this.state;
    return array.map((marker, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: marker.Buss_Lat ? parseFloat(marker.Buss_Lat) : 0,
          longitude: marker.Buss_Long ? parseFloat(marker.Buss_Long) : 0,
        }}
        tracksViewChanges={false}
        onPress={() =>
          this.setState({data: marker, show: true}, () =>
            console.log('Data:markerrrrr ', marker),
          )
        }>
        <LogoMarker height={45} width={45} />
      </Marker>
    ));
  };

  render() {
    const {navigation, route} = this.props;
    const {data, show, longitudeDelta, latitudeDelta, isLoader, access_token} =
      this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{marginLeft: 10}}>
            <BackHeader title="Back" navigation={navigation} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '40%',
              // backgroundColor: 'pink',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => this.decrementCounter()}
              style={{
                height: 30,
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Text>Previous</Text>
            </TouchableOpacity>
            <View
              style={{
                height: 30,
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Text>{this.state.count}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.incrementCounter()}
              style={{
                height: 30,
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '2%',
                // backgroundColor: 'red',
              }}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.state.currentLatitude && this.state.currentLongitude ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: this.state.currentLatitude,
              longitude: this.state.currentLongitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            }}
            style={styles.map}>
            {this.marker()}
          </MapView>
        ) : null}

        {show && (
          <Card style={styles.card}>
            <CompanyCard item={data} />
            <ActionButtons
              item={data}
              show={true}
              navigation={navigation}
              access_token={access_token}
            />
          </Card>
        )}
        <Loader isLoader={isLoader} />
      </SafeAreaView>
    );
  }
}

export default ShowMaps;
