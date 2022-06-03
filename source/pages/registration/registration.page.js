import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';

import InputText from '../../components/input-text/input-text.component';
import InputTextIcon from '../../components/input-text-icon/input-text-icon.component';
import Button from '../../components/button/button.component';
import TouchText from '../../components/touch-text/touch-text.component';
import BackHeader from '../../components/back-header/back-header.component';
import Loader from '../../components/loader/loader.component';
import {register, userType} from '../../configure/api/api.configure';
import {
  verifyEmail,
  verifyPassword,
} from '../../configure/miscellaneous/miscellaneous.configure';

import styles from './registration.style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      isShowPassword: true,
      isShowConfirmPassword: true,
      firstname: '',
      emailid: '',
      mobile: '',
      password: '',
      confirmpassword: '',
      isLoader: false,
      access_token: '',
    };
  }

  submit = async () => {
    const {emailid, confirmpassword, firstname, mobile} = this.state;
    const {navigation} = this.props;
    if (this.validation()) {
      if (this.passwordCheck()) {
        if (this.checkPassEmail(emailid, confirmpassword)) {
          this.setState({isLoader: true});
          let data = qs.stringify({
            grant_type: 'password',
            username: emailid,
            password: confirmpassword,
            ClientId: '2',
            FirstName: firstname,
            MobileNumber: mobile,
          });
          await register(data)
            .then((res) => {
              this.showMessage('Account created successfully');
              this.setState(
                {isLoader: false, access_token: res.access_token},
                () => this.checkUserType(emailid, confirmpassword, firstname, mobile),
              );
            })
            .catch((error) => {
              this.setState({isLoader: false});
              this.showMessage(error.response.data.error_description);
            });
        }
      }
    }
  };

  checkPassEmail = (email, password) => {
    let cancel = false;
    if (verifyEmail(email)) {
      cancel = true;
      this.showMessage('Please enter valid email');
    }
    if (verifyPassword(password)) {
      cancel = true;
      this.showMessage(`Your password must be minimum 8 characters to 16 characters and must contain one uppercase, one digit and special character '?!@#$%^&*'`);
    }
    if (cancel) {
      return false;
    } else {
      return true;
    }
  };

  checkUserType = async () => {
    const {access_token} = this.state;
    let data = JSON.stringify({Type: 2});
    await userType(data, access_token)
      .then((response) => {
        console.log('User_Type: ', response[0][0].User_Type);
        this.saveInStorage(response[0][0].User_Type);
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({isLoader: false});
      });
  };

  passwordCheck = () => {
    const {password, confirmpassword} = this.state;
    if (password !== confirmpassword) {
      this.showMessage('Password does not match');
      return false;
    } else {
      return true;
    }
  };

  validation = () => {
    const {firstname, emailid, password, confirmpassword} = this.state;
    let cancel = false;
    if (firstname.length === 0) {
      cancel = true;
    }
    if (emailid.length === 0) {
      cancel = true;
    }
    if (password.length === 0) {
      cancel = true;
    }
    if (confirmpassword.length === 0) {
      cancel = true;
    }
    if (cancel) {
      this.showMessage('Fields can not be empty');
      return false;
    } else {
      return true;
    }
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

  saveInStorage = async (user_Type) => {
    const {access_token, emailid, confirmpassword, firstname, mobile} = this.state;
    console.log("Email Check: ", emailid, confirmpassword, firstname, mobile)
    const {navigation} = this.props;
    if (
      access_token !== null ||
      access_token !== undefined ||
      access_token !== ''
    ) {
      try {
        const token = ['access_token', JSON.stringify(access_token)];
        const session = ['session', JSON.stringify(false)];
        const userType = ['user_type', JSON.stringify(user_Type)];
        await AsyncStorage.multiSet([token, session, userType]);
        navigation.navigate('VerifyPage', {email: emailid, password: confirmpassword, name: firstname, mobile: mobile})
        console.log('Async Access token error', token, session, userType);
      } catch (error) {
        console.log('Async Access token error', error);
        this.setState({isLoader: false});
      }
    }
  };

  navigate = async () => {
    const {navigation} = this.props;
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      if (access_token !== null) {
        navigation.navigate('RegisterStore', {
          showDrawer: false,
        });
      } else {
        this.showMessage('Please first register to list your store');
      }
    } catch (e) {
      console.log('Async error: ', e);
    }
  };

  render() {
    const {
      isShowPassword,
      isShowConfirmPassword,
      firstname,
      emailid,
      mobile,
      password,
      confirmpassword,
      isLoader,
    } = this.state;
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <BackHeader title="Back" navigation={navigation} />
            <Text style={styles.loginText}>CREATE AN ACCOUNT</Text>
            <View style={styles.inputContainer}>
              <InputText
                placeHolder="Name"
                value={firstname}
                keyboardType="default"
                onChangeText={(firstname) => this.setState({firstname})}
              />
            </View>
            <View style={styles.inputContainer}>
              <InputText
                placeHolder="Email ID"
                value={emailid}
                keyboardType="email-address"
                onChangeText={(emailid) => this.setState({emailid})}
              />
            </View>
            <View style={styles.inputContainer}>
              <InputText
                placeHolder="Mobile Number"
                value={mobile}
                keyboardType="number-pad"
                onChangeText={(mobile) => this.setState({mobile})}
              />
            </View>
            <View style={styles.inputContainer}>
              <InputTextIcon
                placeholder="Password"
                icon={isShowPassword ? 'eye' : 'eye-off'}
                value={password}
                show={isShowPassword}
                onChangeText={(password) => this.setState({password})}
                onPress={() =>
                  this.setState({isShowPassword: !this.state.isShowPassword})
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <InputTextIcon
                placeholder="Confirm Password"
                icon={isShowConfirmPassword ? 'eye' : 'eye-off'}
                value={confirmpassword}
                show={isShowConfirmPassword}
                onChangeText={(confirmpassword) =>
                  this.setState({confirmpassword})
                }
                onPress={() =>
                  this.setState({
                    isShowConfirmPassword: !this.state.isShowConfirmPassword,
                  })
                }
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Create an account" onPress={() => this.submit()} />
            </View>
            <View style={styles.accountView}>
              <Text style={styles.accountText}>
                Do you want your store to get listed?
              </Text>
              <Text style={styles.accountText}>
                <TouchableWithoutFeedback onPress={() => this.navigate()}>
                  <View style={styles.createAcTouch}>
                    <Text style={styles.createTxt}>Click here to </Text>
                    <Text style={styles.createTouchTxt}>list your store</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Text>
            </View>
            <Loader isLoader={isLoader} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default Registration;
