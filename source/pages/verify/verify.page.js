import React from 'react';
import qs from 'qs';
import Icons from 'react-native-vector-icons/AntDesign';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {Text, Button, Title} from 'react-native-paper';
import {Toast} from 'native-base';

import {verify} from '../../configure/api/api.configure';
import {Color} from '../../assets/color/color.assets';

import styles from './verify.style';

const VerifyPage = ({route: {params}, navigation}) => {
  const {email, password, name, mobile} = params;
  return (
    <SafeAreaView style={styles.container}>
      {backHeader(navigation, 'Back')}
      <View style={styles.innerContainer}>
        <Text style={styles.accountText}>
          We sent an email to the registered email address. Please verify your
          email.
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            color={Color.primaryColor}
            onPress={() => reverify(email, password, name, mobile, navigation)}>
            Re-verify email
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const backHeader = (navigation, title) => (
  <TouchableOpacity
    style={styles.titleView}
    onPress={() => navigation.reset({index: 0, routes: [{name: 'Login'}]})}>
    <View style={styles.rowObject}>
      <View>
        <Icons name="arrowleft" color={'rgb(33, 47, 60)'} size={24} />
      </View>
      <Title
        style={[
          styles.title,
          {
            color: 'rgb(33, 47, 60)',
          },
        ]}>
        {title}
      </Title>
    </View>
  </TouchableOpacity>
);

const reverify = async (
  email,
  password,
  name = '',
  mobile = '',
  navigation,
) => {
  let data = qs.stringify({
    grant_type: 'password',
    username: email,
    password: password,
    ClientId: 4,
    FirstName: name,
    MobileNumber: mobile,
  });
  await verify(data)
    .then((response) => {
      showMessage(
        'An Email has been Sent to your Registered Email Address. Request you to please verify your Email',
      );
    })
    .catch((error) => {
      console.log('Verify email error: ', error.response.data.error);
      showMessage(error.response.data.error_description);
    });
};

showMessage = (message) => {
  if (message !== '' && message !== null && message !== undefined) {
    Toast.show({
      text: message,
      style: styles.toasttxt,
      duration: 10000,
    });
  }
};

export default VerifyPage;
