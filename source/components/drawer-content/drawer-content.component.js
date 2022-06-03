import React, {Component} from 'react';
import {View, Alert, Linking} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Title,
  Drawer,
  Text,
  TouchableRipple,
  Avatar,
  Caption,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';

import Shops from '../../assets/svg-files/shops.svg';
import MedicalShops from '../../assets/svg-files/medical-shops.svg';
import Deliveries from '../../assets/svg-files/deliveries.svg';
import Doctors from '../../assets/svg-files/docto.svg';
import Events from '../../assets/svg-files/event.svg';
import Featured from '../../assets/svg-files/featured-home.svg';

import styles from './drawer-content.style';

class DrawerComponent extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      userType: 0,
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;
    navigation.addListener('focus', () => {
      this.getAccessToken();
    });
  }

  getAccessToken = async () => {
    const value = await AsyncStorage.multiGet(['access_token', 'user_type']);
    const access_token = JSON.parse(value[0][1]);
    const userType = JSON.parse(value[1][1]);
    console.log('Drawer info: ', JSON.stringify(value));
    if (access_token && access_token.length !== 0 && userType.length !== 0) {
      this.setState({show: true, userType: userType});
    }
  };

  logout = (navigation) =>
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'LOGOUT', onPress: () => this.signout(navigation)},
        {text: 'CANCEL'},
      ],
      {cancelable: false},
    );

  signout = async (navigation) => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  showVisitMenu = (navigation) => {
    const {userType} = this.state;
    // if (userType === 1) {
    //   return (
    //     <DrawerItem
    //       label="Visited Store"
    //       onPress={() => navigation.navigate('ListPage', {id: 0, type: 3})}
    //       labelStyle={styles.labelStyle}
    //     />
    //   );
    // } else 
    if (userType === 2) {
      return (
        <DrawerItem
          label="Managed your store"
          onPress={() => navigation.navigate('ManagedStore', {id: 0, type: 3})}
          labelStyle={styles.labelStyle}
        />
      );
    } else if (userType === 2) {
      return <View />;
    }
  };

  render() {
    const {navigation} = this.props;
    const {show} = this.state;
    return (
      <View style={styles.drawerContent}>
        <DrawerContentScrollView>
          <View style={styles.drawerContent}>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Featured width={size} height={size} />
                )}
                label="Featured Shop"
                onPress={() =>
                  navigation.navigate('ListPage', {id: 1, type: 1})
                }
                labelStyle={styles.labelStyle}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <MedicalShops width={size} height={size} />
                )}
                label="Weed Shops"
                onPress={() =>
                  navigation.navigate('ListPage', {id: 2, type: 1})
                }
                labelStyle={styles.labelStyle}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Deliveries width={size} height={size} />
                )}
                label="Deliveries"
                onPress={() =>
                  navigation.navigate('ListPage', {id: 3, type: 1})
                }
                labelStyle={styles.labelStyle}
              />
              <DrawerItem
                icon={({color, size}) => <Doctors width={size} height={size} />}
                label="Doctors"
                onPress={() =>
                  navigation.navigate('ListPage', {id: 4, type: 1})
                }
                labelStyle={styles.labelStyle}
              />
              <DrawerItem
                icon={({color, size}) => <Events width={size} height={size} />}
                label="Activities"
                onPress={() =>
                  navigation.navigate('ListPage', {id: 5, type: 1})
                }
                labelStyle={styles.labelStyle}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                label="Home"
                onPress={() => navigation.navigate('Home')}
                labelStyle={styles.labelStyle}
              />
              {!show && (
                <DrawerItem
                  label="Login"
                  onPress={() => navigation.navigate('Login')}
                  labelStyle={styles.labelStyle}
                />
              )}
              {!show && (
                <DrawerItem
                  label="Register"
                  onPress={() => navigation.navigate('Registration')}
                  labelStyle={styles.labelStyle}
                />
              )}
              {show && (
                <DrawerItem
                  label="List a store"
                  onPress={() =>
                    navigation.navigate('RegisterStore', {
                      showDrawer: true,
                    })
                  }
                  labelStyle={styles.labelStyle}
                />
              )}
              <DrawerItem
          label="Visited Store"
          onPress={() => navigation.navigate('ListPage', {id: 0, type: 3})}
          labelStyle={styles.labelStyle}
        />
              {show && (
                <DrawerItem
                  label="Settings"
                  onPress={() => navigation.navigate('AccountSettings')}
                  labelStyle={styles.labelStyle}
                />
              )}
              {this.showVisitMenu(navigation)}
              <DrawerItem
                label="Privacy Policy"
                onPress={() =>
                  Linking.openURL('http://medsie.com/privacy.html')
                }
                labelStyle={styles.labelStyle}
              />
              <DrawerItem
                label="About Medsie"
                onPress={() => Linking.openURL('http://medsie.com/')}
                labelStyle={styles.labelStyle}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          {show && (
            <Drawer.Item
              icon={({color, size}) => (
                <Icon name="logout" color={color} size={size} />
              )}
              label="Log Out"
              onPress={() => {
                navigation.closeDrawer();
              }}
              labelStyle={styles.labelStyle}
              onPress={() => this.logout(navigation)}
            />
          )}
        </Drawer.Section>
      </View>
    );
  }
}

export default DrawerComponent;
