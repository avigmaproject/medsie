import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import MedsieLogo from "../../assets/svg-files/medsie_logo.svg";

import styles from './header.style';

const Header = ({navigation}) => (
  <View style={styles.headerView}>
    <TouchableOpacity
      style={styles.menu}
      onPress={() => navigation.toggleDrawer()}>
      <Icon name="menu" color="rgba(0,0,0,0.4)" size={24} />
    </TouchableOpacity>
    <MedsieLogo style={styles.logo} height={120} width={120}/>
  </View>
);
export default Header;
