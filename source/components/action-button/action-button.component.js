import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Call from '../../assets/svg-files/call.svg';
import Car from '../../assets/svg-files/car.svg';
import Location from '../../assets/svg-files/location.svg';

import styles from './action-button.style';

const ActionButtons = ({item, navigation, access_token, show}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.icon} onPress={() => call(item)}>
      <Call height={45} width={45} />
      <Text style={styles.label}>Call</Text>
    </TouchableOpacity>
    {show && (
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigate(item, navigation, access_token)}>
        <Car height={45} width={45} />
        <Text style={styles.label}>Review</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity style={styles.icon} onPress={() => map(item)}>
      <Location height={45} width={45} />
      <Text style={styles.label}>Direction</Text>
    </TouchableOpacity>
    {item.Buss_WebSite && (
      <TouchableOpacity
        style={styles.icon}
        onPress={() => web(item.Buss_WebSite)}>
        <Image
          resizeMode={'stretch'}
          style={{height: 40, width: 40}}
          source={require('../../assets/png-images/web-icon.png')}
        />
        <Text style={styles.label}>WebSite</Text>
      </TouchableOpacity>
    )}
  </View>
);

const call = (data) => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${data.Buss_Number}`;
  } else {
    phoneNumber = `tel://${data.Buss_Number}`;
  }
  Linking.openURL(phoneNumber);
};

const navigate = (data, navigation, access_token) => {
  if (access_token !== null)
    navigation.navigate('WriteReviews', {
      data: data,
      access_token: access_token,
    });
  else {
    Alert.alert('Login alert', 'Please login to review this business', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Login',
        onPress: () => navigation.reset({index: 0, routes: [{name: 'Login'}]}),
      },
    ]);
  }
};

const map = (data) => {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${data.Buss_Lat},${data.Buss_Long}`;
  const label = data.Buss_Name;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  Linking.openURL(url);
};
const web = (data) => {
  Linking.openURL(data);
};

export default ActionButtons;
