import React, {Component} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import BackHeader from '../../components/back-header/back-header.component';
import CompanyCard from '../../components/company-card/company-card.component';
import ActionButtons from '../../components/action-button/action-button.component';
import Introduction from '../../components/introduction/introduction.component';
import TimingStatus from '../../components/timing-status/timing-status.component';
import Reviews from '../../components/review/review.component';
import ReviewsComment from '../../components/reviews-comment/reviews-comment.component';
import ClaimBusiness from '../../components/claim-business/claim-business.component';
import Loader from '../../components/loader/loader.component';
import {getBusinessData} from '../../configure/api/api.configure';
import {createOffset} from '../../configure/miscellaneous/miscellaneous.configure';

import styles from './listing.style';

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      item: {},
      currentLatitude: 0,
      currentLongitude: 0,
      access_token: '',
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;
    navigation.addListener('focus', () => {
      this.setState(
        {isLoader: true},
        () => this.getLatLong(),
        console.log('Offset: ', createOffset(new Date())),
      );
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
      () => this.categoryData(),
    );
  };

  categoryData = async () => {
    const {route} = this.props;
    const {currentLatitude, currentLongitude, access_token} = this.state;
    this.setState({isLoader: true});
    let data = JSON.stringify({
      Type: 3,
      Buss_PkId: route.params.id,
      Buss_Lat: currentLatitude,
      Buss_Long: currentLongitude,
      PageNumber: 1,
      NoofRows: 50,
      Buss_User_TimeZone: createOffset(new Date()),
    });
    console.log('data: ', data);
    await getBusinessData(data, access_token)
      .then((response) => {
        // console.log('=================');
        // console.log(response);
        // console.log('=================');

        this.setState({item: response[0][0], isLoader: false});
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({isLoader: false});
      });
  };

  render() {
    const {item, isLoader, access_token} = this.state;
    // console.log('========**1=========');
    // console.log(item);
    // console.log('=======**2==========');

    const {navigation} = this.props;
    console.log('Item: ', JSON.stringify(item));
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.innerContainer}>
            <View style={styles.main}>
              <BackHeader title="Back" navigation={navigation} />
              <CompanyCard style={styles.main} item={item} />
              <ActionButtons
                item={item}
                navigation={navigation}
                access_token={access_token}
                show={true}
              />
              <Introduction item={item} />
              <View style={styles.border} />
              <TimingStatus item={item} />
              <View style={styles.border} />
              <ClaimBusiness
                item={item}
                access_token={access_token}
                categoryData={this.categoryData}
                navigation={navigation}
              />
              <Reviews item={item} />
              <ReviewsComment
                list={item.RatingMaster_DTO}
                navigation={navigation}
                show={false}
              />
            </View>
            <Loader isLoader={isLoader} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Listing;
