import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import qs from 'qs';
import ImagePicker from 'react-native-image-crop-picker';

import Header from '../../components/header/header.component';
import BackHeader from '../../components/back-header/back-header.component';
import InputText from '../../components/input-text/input-text.component';
import MultilineInput from '../../components/multiline-input/multiline-input.component';
import Button from '../../components/button/button.component';
import NoBackgroundButton from '../../components/no-background-button/no-background-button.component';
import ModalPicker from '../../components/modal-picker/modal-picker.component';
import ModalList from '../../components/modal-list/modal-list.component';
import Loader from '../../components/loader/loader.component';
import GoogleAutoComplete from '../../components/google-auto-complete/google-auto-complete.component';
import {
  registerStore,
  categoryStore,
  registerStoreImage,
} from '../../configure/api/api.configure';
import {selling_type, week_days, week_ends} from './register-store.list';
import {createOffset} from '../../configure/miscellaneous/miscellaneous.configure';

import styles from './register-store.style';

class RegisterStore extends Component {
  initialState = {
    storeName: '',
    storeNumber: '',
    storeAddress: '',
    addIntroduction: '',
    businessCategory: '',
    sellingType: '',
    website: '',
    isPickerVisible: false,
    mode: '',
    key: '',
    modal: '',
    array: [],
    catArray: [],
    access_token: '',
    isLoader: false,
    base64: '',
    fileName: 'image',
    imagePath: '',
    catId: 0,
    sellId: 0,
    fMonday: '10:00 AM',
    tMonday: '10:00 AM',
    fTuesday: '10:00 AM',
    tTuesday: '10:00 AM',
    fWednesday: '10:00 AM',
    tWednesday: '10:00 AM',
    fThursday: '10:00 AM',
    tThursday: '10:00 AM',
    fFriday: '10:00 AM',
    tFriday: '10:00 AM',
    fSaturday: '10:00 AM',
    tSaturday: '10:00 AM',
    fSunday: '10:00 AM',
    tSunday: '10:00 AM',
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
    });
  }

  getAccessToken = async () => {
    let access_token = '';
    try {
      access_token = await AsyncStorage.getItem('access_token');
      this.setState({access_token}, () => this.getCategory());
    } catch (error) {
      console.log(error);
    }
  };

  getCategory = async () => {
    const {access_token} = this.state;
    console.log('Access Token: ', access_token);
    await categoryStore(JSON.parse(access_token))
      .then((response) => {
        let arr = [];
        response[0].map((val) =>
          arr.push({
            id: val.Cat_PkId,
            type: val.Cat_Name,
          }),
        );
        this.setState({catArray: arr});
      })
      .catch((error) => console.log('Error: ', error));
  };

  submit = async () => {
    const {
      storeName,
      storeNumber,
      storeAddress,
      addIntroduction,
      website,
      access_token,
      base64,
      fileName,
      catId,
      sellId,
      fMonday,
      tMonday,
      fTuesday,
      tTuesday,
      fWednesday,
      tWednesday,
      fThursday,
      tThursday,
      fFriday,
      tFriday,
      fSaturday,
      tSaturday,
      fSunday,
      tSunday,
    } = this.state;
    this.setState({isLoader: true, isPickerVisible: false});
    let arr = [
      {
        BHT_Weekdays: 'Monday',
        BHT_FromTime: fMonday,
        BHT_ToTime: tMonday,
        BHT_CustomDate: '',
        BHT_Flag: 0,
      },
      {
        BHT_Weekdays: 'Tuesday',
        BHT_FromTime: fTuesday,
        BHT_ToTime: tTuesday,
        BHT_CustomDate: '',
        BHT_Flag: 0,
      },
      {
        BHT_Weekdays: 'Wednesday',
        BHT_FromTime: fWednesday,
        BHT_ToTime: tWednesday,
        BHT_CustomDate: '',
        BHT_Flag: 0,
      },
      {
        BHT_Weekdays: 'Thurday',
        BHT_FromTime: fThursday,
        BHT_ToTime: tThursday,
        BHT_CustomDate: '',
        BHT_Flag: 0,
      },
      {
        BHT_Weekdays: 'Friday',
        BHT_FromTime: fFriday,
        BHT_ToTime: tFriday,
        BHT_CustomDate: '',
        BHT_Flag: 0,
      },
      {
        BHT_Weekdays: 'Saturday',
        BHT_FromTime: fSaturday,
        BHT_ToTime: tSaturday,
        BHT_CustomDate: '',
        BHT_Flag: 0,
      },
      {
        BHT_Weekdays: 'Sunday',
        BHT_FromTime: fSunday,
        BHT_ToTime: tSunday,
        BHT_CustomDate: '',
        BHT_Flag: 0,
      },
    ];
    if (catId !== 0 && sellId !== 0) {
      if (base64.length === 0) {
        var pattern =
          /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (pattern.test(website)) {
          let data = JSON.stringify({
            Type: 1,
            Buss_Name: storeName,
            Buss_Number: storeNumber,
            Buss_Address: storeAddress,
            Buss_Description: addIntroduction,
            Buss_WebSite: website,
            BusinessHoursTransMaster_DTO: JSON.stringify(arr),
            Buss_City: '',
            Buss_Country: '',
            Buss_Zip: '',
            Buss_UserId: '',
            Buss_Image_Path: '',
            Buss_CatId: catId,
            Buss_TypeOfBuss: '',
            Buss_SellType: sellId,
            Buss_Lat: '',
            Buss_Long: '',
            UserID: '',
            Buss_TimeZone: createOffset(new Date()),
            Buss_IsApprove: 2,
          });
          console.log('datadata', data);
          await registerStore(data, JSON.parse(access_token))
            .then((response) => {
              console.log('response1', response);

              this.setState({isLoader: false});
              this.showMessage('Your store is pending verification');
              this.props.navigation.goBack();
            })
            .catch((error) => console.log('Error: ', error));
        } else {
          this.showMessage('Invalid URL');
          this.setState({isLoader: false});
        }
      } else {
        var pattern =
          /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (pattern.test(website)) {
          let data = JSON.stringify({
            Type: 1,
            Buss_Name: storeName,
            Buss_Number: storeNumber,
            Buss_Address: storeAddress,
            Buss_Description: addIntroduction,
            Buss_WebSite: website,
            BusinessHoursTransMaster_DTO: JSON.stringify(arr),
            Buss_City: '',
            Buss_Country: '',
            Buss_Zip: '',
            Buss_UserId: '',
            Buss_Image_Path: '',
            Buss_CatId: catId,
            Buss_TypeOfBuss: '',
            Buss_SellType: sellId,
            Buss_Lat: '',
            Buss_Long: '',
            ContentType: 1,
            IPLNO: 'Images',
            Image: 'data:image/png;base64, ' + base64,
            Client_Result_Photo_FileName: fileName,
            Buss_TimeZone: createOffset(new Date()),
            Buss_IsApprove: 2,
          });
          console.log('Image: ', access_token);
          await registerStoreImage(data, JSON.parse(access_token))
            .then((response) => {
              console.log('response2', response);
              this.setState({isLoader: false});
              this.showMessage('Your store is pending verification');
              this.props.navigation.goBack();
            })
            .catch((error) => {
              console.log('Error: ', error);
              this.setState({isLoader: false});
              this.showMessage(error.response.data.error_description);
            });
        } else {
          this.showMessage('Invalid URL');
          this.setState({isLoader: false});
        }
      }
    } else {
      this.showMessage('Category is an mandtory field');
      this.setState({isLoader: false});
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

  onDateTimeChange = (selectedDate) => {
    let dateTime = format(selectedDate, 'hh:mm a');
    const {key} = this.state;
    this.setState({[key]: dateTime});
    this.setState({isPickerVisible: false});
  };

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

  changeState = (key, value) => {
    this.setState({[key]: value});
  };

  weekdays = (day) => (
    <View>
      <View style={styles.row}>
        <Text style={styles.text}> {day} </Text>
        <View style={styles.rowD}>
          <NoBackgroundButton
            title={this.state[`f${day}`]}
            onPress={() =>
              this.setState({
                isPickerVisible: true,
                mode: 'time',
                key: `f${day}`,
              })
            }
          />
          <Text> to </Text>
          <NoBackgroundButton
            title={this.state[`t${day}`]}
            onPress={() =>
              this.setState({
                isPickerVisible: true,
                mode: 'time',
                key: `t${day}`,
              })
            }
          />
        </View>
      </View>
    </View>
  );

  uploadImage = () => (
    <View>
      {this.state.imagePath.length === 0 ? (
        <TouchableOpacity
          style={styles.uploadImageView}
          onPress={() => this.pickImage()}>
          <Icon name="upload" size={30} />
          <Text style={styles.uploadImageTxt}> Upload an Image </Text>
        </TouchableOpacity>
      ) : (
        <Image source={{uri: this.state.imagePath}} style={styles.imageView} />
      )}
    </View>
  );

  pickImage = () => {
    this.setState({isOpen: false}, () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5,
      })
        .then((images) => {
          this.setState({
            base64: images.data,
            fileName:
              Platform.OS === 'ios' ? images.filename : 'images' + new Date(),
            imagePath: images.path,
          });
        })
        .catch((error) => console.log('Error in image: ', error));
    });
  };

  dateTimePicker = () => (
    <View>
      {this.state.isPickerVisible && (
        <DateTimePickerModal
          isVisible={this.state.isPickerVisible !== null}
          mode={this.state.mode}
          onConfirm={this.onDateTimeChange}
          onCancel={() => this.setState({isPickerVisible: false})}
        />
      )}
    </View>
  );

  render() {
    const {navigation, route} = this.props;
    const {showDrawer} = route.params;
    const {
      storeName,
      storeNumber,
      storeAddress,
      addIntroduction,
      modal,
      array,
      businessCategory,
      sellingType,
      key,
      catArray,
      isLoader,
      pkid,
      website,
    } = this.state;
    return (
      <SafeAreaView style={styles.contain}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <BackHeader title="Back" navigation={navigation} />
            <View style={styles.bodycontainer}>
              <Text style={styles.title}> Register your store </Text>
              {this.uploadImage()}
              <View style={styles.inputContainer}>
                <InputText
                  placeHolder="Enter store name"
                  value={storeName}
                  keyboardType="default"
                  onChangeText={(storeName) => this.setState({storeName})}
                />
              </View>
              <View style={styles.inputContainer}>
                <InputText
                  placeHolder="Enter store number"
                  keyboardType="number-pad"
                  value={storeNumber}
                  onChangeText={(storeNumber) => this.setState({storeNumber})}
                />
              </View>
              <View style={styles.inputContainer}>
                <InputText
                  placeHolder="Enter website"
                  keyboardType="default"
                  value={website}
                  onChangeText={(website) => this.setState({website})}
                />
              </View>
              <View style={styles.inputContainer}>
                <ModalPicker
                  placeHolder="Enter business category"
                  onPress={() =>
                    this.setState({
                      modal: true,
                      array: catArray,
                      key: 'businessCategory',
                      pkid: 'catId',
                    })
                  }
                  value={businessCategory}
                />
              </View>
              <View style={styles.inputContainer}>
                <ModalPicker
                  placeHolder="Enter selling type"
                  onPress={() =>
                    this.setState({
                      modal: true,
                      array: selling_type,
                      key: 'sellingType',
                      pkid: 'sellId',
                    })
                  }
                  value={sellingType}
                />
              </View>
              <View style={styles.inputContainer}>
                <View>
                  <GoogleAutoComplete
                    placeHolder="Enter store address"
                    onPress={(a, b) =>
                      this.setState({storeAddress: a.description})
                    }
                    ref={(instance) => {
                      this.GooglePlacesRef = instance;
                    }}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <MultilineInput
                  placeHolder="Add Introduction"
                  message="Not more than 500 words"
                  value={addIntroduction}
                  keyboardType="default"
                  onChangeText={(addIntroduction) =>
                    this.setState({addIntroduction})
                  }
                />
              </View>
              {this.weekdays('Monday')}
              {this.weekdays('Tuesday')}
              {this.weekdays('Wednesday')}
              {this.weekdays('Thursday')}
              {this.weekdays('Friday')}
              {this.weekdays('Saturday')}
              {this.weekdays('Sunday')}
              {this.dateTimePicker()}
              <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={() => this.submit()} />
              </View>
            </View>
            <ModalList
              isModalVisible={modal}
              list={array}
              changeModalVisibility={this.changeModalVisibility}
              changeState={this.changeState}
              id={key}
              pkid={pkid}
            />
            <Loader isLoader={isLoader} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default RegisterStore;
