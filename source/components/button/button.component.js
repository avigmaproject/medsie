import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {Color} from '../../assets/color/color.assets'

import styles from './button.style';

const Button = ({title, onPress, color, buttonStyle}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.button, {backgroundColor: color ? color : Color.primaryColor}, buttonStyle]}>
      <Text style={styles.title}> {title} </Text>
    </View>
  </TouchableOpacity>
);

export default Button;
