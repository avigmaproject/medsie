import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from 'react-native-paper';
import StarRating from 'react-native-star-rating';

import Loader from '../../components/loader/loader.component';
import CompanyCard from '../../components/company-card/company-card.component';
import BackHeader from '../../components/back-header/back-header.component';
import Reviews from '../../components/review/review.component';
import ReviewsComment from '../../components/reviews-comment/reviews-comment.component';
import {getBusinessData} from '../../configure/api/api.configure';

import styles from './reply-review.style';
class ReplyReview extends Component {
  constructor() {
    super();
    this.state = {
      currentLatitude: 0,
      currentLongitude: 0,
      access_token: '',
      item: {},
      isLoader: false,
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;
    const {access_token, BussId} = route.params;
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
      () => this.categoryData(),
    );
  };

  categoryData = async () => {
    const {route} = this.props;
    const {currentLatitude, currentLongitude, access_token} = this.state;
    this.setState({isLoader: true});
    let data = JSON.stringify({
      Type: 3,
      Buss_PkId: route.params.BussId,
      Buss_Lat: currentLatitude,
      Buss_Long: currentLongitude,
      PageNumber: 1,
      NoofRows: 50,
    });
    console.log('Access: ', currentLatitude, currentLongitude, access_token);
    await getBusinessData(data, access_token)
      .then((response) => {
        this.setState(
          {item: response[0][0], isLoader: false},
          console.log(JSON.stringify(response)),
        );
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({isLoader: false});
      });
  };

  render() {
    const {navigation, route} = this.props;
    const {item, isLoader} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.innerContainer}>
            <View style={styles.main}>
              <BackHeader title="Back" navigation={navigation} />
              <CompanyCard style={styles.main} item={item} />
              <Reviews item={item} />
              <ReviewsComment
                list={item.RatingMaster_DTO}
                navigation={navigation}
                show={true}
                id={route.params.BussId}
              />
            </View>
          </View>
        </ScrollView>
        <Loader isLoader={isLoader} />
      </SafeAreaView>
    );
  }
}

export default ReplyReview;
