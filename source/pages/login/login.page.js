import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
  BackHandler,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import qs from 'qs';

import InputText from '../../components/input-text/input-text.component';
import InputTextIcon from '../../components/input-text-icon/input-text-icon.component';
import Button from '../../components/button/button.component';
import TouchText from '../../components/touch-text/touch-text.component';
import Loader from '../../components/loader/loader.component';
import {
  login,
  userType,
  forgotPassword,
} from '../../configure/api/api.configure';
import MedsieLogo from '../../assets/svg-files/medsie_logo.svg';
import appConfig from '../../../app.json';
import {verifyEmail} from '../../configure/miscellaneous/miscellaneous.configure';

import styles from './login.style';

class Login extends Component {
  watchId = null;
  constructor() {
    super();
    this.state = {
      isShowPassword: true,
      emailid: '',
      password: '',
      access_token: '',
      isLoader: false,
      forceLocation: true,
      highAccuracy: true,
      loading: false,
      showLocationDialog: true,
      significantChanges: false,
      updatesEnabled: false,
      foregroundService: false,
      location: {},
      currentLatitude: 0,
      currentLongitude: 0,
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;
    navigation.addListener('focus', () => {
      this.setState({isLoader: true}, () => this.getLocation());
      this.getAccessToken();
    });
  }

  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');
    console.log('Check');
    if (status === 'granted') {
      console.log('granted');
      return true;
    }

    if (status === 'denied') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {
            text: "Don't Use Location",
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
      );

      console.log('denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {
            text: "Don't Use Location",
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
      );

      console.log('disable');
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      console.log('POst');
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState(
            {
              currentLatitude: position.coords.latitude,
              currentLongitude: position.coords.longitude,
              loading: false,
            },
            () => this.saveLocation(),
          );
        },
        (error) => {
          this.setState({loading: false});
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      );
    });
  };

  getAccessToken = async () => {
    const {navigation} = this.props;
    try {
      const value = await AsyncStorage.multiGet(['access_token', 'session']);
      const access_token = JSON.parse(value[0][1]);
      const session = JSON.parse(value[1][1]);
      if (
        access_token !== null &&
        access_token !== undefined &&
        access_token !== ''
      ) {
        if (session) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({isLoader: false});
    }
    this.setState({isLoader: false});
  };

  saveLocation = async () => {
    const {currentLatitude, currentLongitude} = this.state;
    try {
      const latitude = ['latitude', JSON.stringify(currentLatitude)];
      const longitude = ['longitude', JSON.stringify(currentLongitude)];
      await AsyncStorage.multiSet([latitude, longitude]);
      console.log('Set: ', latitude, longitude);
    } catch (error) {
      console.log(' Location error ', error);
    }
  };

  submit = async () => {
    const {emailid, password, firstname} = this.state;
    const {navigation} = this.props;
    this.setState({isLoader: true});
    if (this.validation()) {
      this.setState({isLoader: true});
      let data = qs.stringify({
        grant_type: 'password',
        username: emailid,
        password: password,
        ClientId: '1',
        FirstName: '',
      });
      await login(data)
        .then((res) => {
          console.log('res: ', JSON.stringify(res));
          this.setState({isLoader: false});
          this.setState({access_token: res.access_token}, () =>
            this.checkUserType(),
          );
        })
        .catch((error) => {
          this.setState({isLoader: false});
          this.showMessage(error.response.data.error_description);
        });
    }
  };

  home = async () => {
    const {navigation} = this.props;
    await AsyncStorage.setItem('session', JSON.stringify(true));
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
    this.setState({isLoader: false});
  };

  validateEmail = async () => {
    const {emailid} = this.state;
    this.setState({isLoader: true});
    console.log('Email: ', emailid);
    if (emailid.length !== 0) {
      if (!verifyEmail(emailid)) {
        let data = JSON.stringify({
          EmailID: emailid,
          Type: 1,
        });
        console.log('Log FOr: ', data);
        await forgotPassword(data).then((res) => {
          console.log('Res forgot password ', res);
          this.setState({isLoader: false});
          this.showMessage(
            'Link has been sent to your mentioned email address',
          );
        });
      } else {
        this.setState({isLoader: false});
        this.showMessage('Please enter valid email address');
      }
    } else {
      this.setState({isLoader: false});
      this.showMessage('Please enter valid email address');
    }
  };

  checkUserType = async () => {
    const {access_token} = this.state;
    let data = JSON.stringify({Type: 2});
    await userType(data, access_token)
      .then((response) => {
        console.log('User_Type: ', response[0][0].User_Type);
        this.saveInStorage(response[0][0].User_Type);
        this.home();
        this.showMessage('Logged in successfully');
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({isLoader: false});
      });
  };

  saveInStorage = async (user_Type) => {
    const {access_token} = this.state;
    if (
      access_token !== null ||
      access_token !== undefined ||
      access_token !== ''
    ) {
      try {
        const token = ['access_token', JSON.stringify(access_token)];
        const session = ['session', JSON.stringify(true)];
        const userType = ['user_type', JSON.stringify(user_Type)];
        await AsyncStorage.multiSet([token, session, userType]);
      } catch (error) {
        console.log('Async Access token error', access_token);
        alert(error);
        this.setState({isLoader: false});
      }
    }
  };

  validation = () => {
    const {emailid, password} = this.state;
    let cancel = false;
    if (emailid.length === 0) {
      cancel = true;
    }
    if (password.length === 0) {
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
        duration: 5000,
      });
    }
  };

  navigate = (page) => {
    const {navigation} = this.props;
    navigation.navigate(page);
  };

  header = () => (
    <View style={styles.headerView}>
      <MedsieLogo style={styles.logo} height={170} width={170} />
    </View>
  );

  render() {
    const {isShowPassword, emailid, password, isLoader} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          {this.header()}
          <View style={styles.innerContainer}>
            <Text style={styles.title}>
              Find weed shops, doctors, and activities near me
            </Text>
            <Text style={styles.loginText}>LOGIN</Text>
            <View style={styles.inputContainer}>
              <InputText
                placeHolder="Email ID"
                value={emailid}
                keyboardType="email-address"
                onChangeText={(emailid) =>
                  this.setState({emailid}, () =>
                    console.log('Email: ', emailid),
                  )
                }
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
            <View style={styles.buttonContainer}>
              <Button title="Login" onPress={() => this.submit()} />
            </View>
            <View style={styles.forgotPassView}>
              <TouchText
                title="Forgot Password?"
                txtstyle={styles.forgotPassword}
                onPress={() => this.validateEmail()}
              />
            </View>
            <View style={styles.accountView}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <Text style={styles.accountText}>
                <TouchableWithoutFeedback
                  onPress={() => this.navigate('Registration')}>
                  <View style={styles.createAcTouch}>
                    <Text style={styles.createTxt}>Click here to </Text>
                    <Text style={styles.createTouchTxt}>
                      create a new account
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </Text>
              <TouchableWithoutFeedback onPress={() => this.home()}>
                <Text style={styles.skip}>Skip for now</Text>
              </TouchableWithoutFeedback>
            </View>
            <Loader isLoader={isLoader} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default Login;
