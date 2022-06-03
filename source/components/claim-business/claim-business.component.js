import React from 'react';
import {View, ToastAndroid, Alert, TouchableOpacity, Text} from 'react-native';

import {registerStore} from '../../configure/api/api.configure';

import styles from './claim-business.style';

const ClaimBusiness = ({access_token, item, categoryData, navigation}) => (
  <View style={styles.buttonView}>
    {item.Buss_IsApprove_bit ? (
      <View>
        <View style={styles.titleView}>
          <Text style={styles.title}></Text>
          <TouchableOpacity style={styles.showMap} onPress={() => claimBusiness(item, access_token, categoryData, navigation)}>
            <Text style={styles.title}>Claim Business</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null}
  </View>
);

const claimBusiness = async (item, access_token, categoryData, navigation) => {
  if (access_token !== null && access_token !== undefined) {
    let data = JSON.stringify({
      Buss_PkId: item.Buss_PkId,
      Buss_IsApprove: 2,
      Type: 6,
    });
    await registerStore(data, access_token)
      .then((response) => {
        console.log('Response: ', response);
        ToastAndroid.show('You have claimed this business', ToastAndroid.LONG);
        categoryData();
      })
      .catch((error) => console.log('Claim Business error: ', error));
  } else {
    Alert.alert(
      'Login alert',
      'Please login to claim this business',
      [
        {
          text: 'LOGIN',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
        },
        {text: 'CANCEL'},
      ],
      {cancelable: false},
    );
  }
};

export default ClaimBusiness;
