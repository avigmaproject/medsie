import React, {Component} from 'react';
import {View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Text} from 'react-native-paper';
import {format} from 'date-fns';

import InputText from '../../components/input-text/input-text.component';
import InputTextIcon from '../../components/input-text-icon/input-text-icon.component';
import ModalPicker from '../../components/modal-picker/modal-picker.component';
import Button from '../../components/button/button.component';
import {
  accountSettings,
  updateUserProfile,
} from '../../configure/api/api.configure';
import {
  verifyEmail,
  verifyPassword,
} from '../../configure/miscellaneous/miscellaneous.configure';
import BackHeader from '../../components/back-header/back-header.component';

import styles from './account-settings.style';

class AccountSettings extends Component {
  initialState = {
    emailid: '',
    isShowPassword: true,
    password: '',
    isLoader: true,
    name: '',
    phone: '',
    dob: '',
    access_token: '',
    bussinessData: [],
    birthdayPicker: false,
  };
  constructor() {
    super();
    this.state = {
      ...this.initialState,
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;
    navigation.addListener('focus', () => {
      this.getAccessToken();
      this.setState(this.initialState);
      this.setState({isLoader: true});
    });
  }

  getAccessToken = async () => {
    let access_token = '';
    try {
      access_token = await AsyncStorage.getItem('access_token');
      this.setState({access_token}, () => this.getAccountSettings());
    } catch (error) {
      console.log(error);
    }
  };

  getAccountSettings = async () => {
    const {access_token} = this.state;
    await accountSettings(JSON.parse(access_token))
      .then((response) => {
        this.addViewData(response[0][0]);
      })
      .catch((error) => console.log('Error: ', error));
  };

  addViewData = (response) => {
    this.setState(
      {
        name: response.User_Name,
        emailid: response.User_Email,
        password: response.User_Password,
        phone: response.User_Phone,
        dob: response.User_DOB
          ? this.dateFormatter(new Date(Date.parse(response.User_DOB)))
          : '',
        isLoader: false,
        bussinessData: response.BusinessMaster_DTO,
      },
      () => console.log('Resp: ', response),
    );
  };

  navigate = (nav) => {
    const {navigation} = this.props;
    navigation.navigate('RegisterStore', {
      showDrawer: false,
    });
  };

  update = async () => {
    const {name, emailid, password, phone, dob, access_token} = this.state;
    const {navigation} = this.props;
    if (this.validation()) {
      if (this.checkPassEmail(emailid, password)) {
        this.setState({isLoader: true});
        let data = JSON.stringify({
          Type: 2,
          User_Name: name,
          User_Email: emailid,
          User_Password: password,
          User_Phone: phone,
          User_DOB: dob,
          User_Address: '',
          User_City: '',
          User_Country: '',
          User_Zip: '',
          User_Type: '',
          User_Image_Path: '',
          User_MacID: '',
          User_IsVerified: '',
          User_IsActive: '',
          User_IsDelete: '',
        });
        await updateUserProfile(data, JSON.parse(access_token))
          .then((res) => {
            this.showMessage('Update successfully');
            navigation.goBack();
          })
          .catch((error) => {
            this.setState({isLoader: false});
            alert(error);
          });
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
      this.showMessage(
        `Your password must be minimum 8 characters to 16 characters and must contain one uppercase, one digit and special character '?!@#$%^&*'`,
      );
    }
    if (cancel) {
      return false;
    } else {
      return true;
    }
  };

  validation = () => {
    const {name, emailid, password, phone, dob} = this.state;
    let cancel = false;
    if (name.length === 0) {
      cancel = true;
    }
    if (emailid.length === 0) {
      cancel = true;
    }
    if (password.length === 0) {
      cancel = true;
    }
    if (phone.length === 0) {
      cancel = true;
    }
    if (dob.length === 0) {
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
    Toast.show({
      text: message,
      style: styles.toasttxt,
      duration: 10000,
    });
  };

  onDateTimeChange = (selectedDate) => {
    console.log('A date has been picked: ', selectedDate);
    let dateTime = this.dateFormatter(selectedDate);
    this.setState({dob: dateTime});
    this.setState({birthdayPicker: false});
  };

  dateFormatter = (date) => {
    return format(date, 'MM-dd-yyyy');
  };

  dateTimePicker = () => {
    return (
      <View>
        {this.state.birthdayPicker && (
          <DateTimePickerModal
            isVisible={this.state.birthdayPicker}
            mode={'date'}
            onConfirm={this.onDateTimeChange}
            onCancel={() => this.setState({birthdayPicker: false})}
            maximumDate={new Date(Date.now())}
          />
        )}
      </View>
    );
  };

  render() {
    const {navigation} = this.props;
    const {
      isShowPassword,
      emailid,
      password,
      isLoader,
      phone,
      dob,
      name,
      bussinessData,
      access_token,
    } = this.state;
    console.log('Data Settings: ', JSON.stringify(bussinessData));
    console.log('this.state.birthdayPicker', this.state.birthdayPicker);
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Back" navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <View style={[styles.row, styles.titleContainer]}>
              <Text style={styles.titeText}>Account Settings</Text>
            </View>
            <View style={styles.inputContainer}>
              <InputText
                placeHolder="Name"
                value={name}
                keyboardType="default"
                onChangeText={(name) => this.setState({name})}
              />
            </View>
            <View style={styles.inputContainer}>
              <InputText
                placeHolder="Email ID"
                value={emailid}
                keyboardType="email-address"
                onChangeText={(emailid) => this.setState({emailid})}
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
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
            </View>
            <View style={styles.inputContainer}>
              <InputText
                placeHolder="Phone"
                value={phone}
                keyboardType="number-pad"
                onChangeText={(phone) => this.setState({phone})}
              />
            </View>
            <View style={styles.inputContainer}>
              <ModalPicker
                placeHolder="Date Of Birth"
                onPress={() => this.setState({birthdayPicker: true})}
                value={dob}
              />
            </View>
            {/* {this.state.birthdayPicker && (
              <DateTimePickerModal
                testID="dateTimePicker"
                // isVisible={this.state.birthdayPicker}
                mode={'date'}
                value={new Date()}
                display="default"
                onChange={this.onDateTimeChange}
                // onConfirm={() => this.onDateTimeChange()}
                onCancel={() => this.setState({birthdayPicker: false})}
                maximumDate={new Date(Date.now())}
              />
            )} */}
            <View style={styles.buttonContainer}>
              <Button title="Edit Settings" onPress={() => this.update()} />
            </View>
            {this.dateTimePicker()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AccountSettings;
