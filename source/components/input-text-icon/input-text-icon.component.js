import React from 'react';
import {TextInput, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

import {Color} from '../../assets/color/color.assets'

import styles from "./input-text-icon.style"

const InputTextIcon = ({placeholder, icon, onChangeText, value, show, onPress, focus}) => (
  <View>
  <Text style={styles.placeholder}>{placeholder}</Text>
    <View style={styles.inputContainer}>
    <TextInput 
      style={styles.input}
      underlineColorAndroid="transparent"
      secureTextEntry={show}
      onChangeText={onChangeText}
      value={value}
      autoFocus={focus}
    />
    <TouchableOpacity onPress={onPress}>
      <Icon size={24} color={Color.grey} name={icon} style={styles.iconStyle}/>
    </TouchableOpacity>
  </View>
  </View>
);

export default InputTextIcon;
