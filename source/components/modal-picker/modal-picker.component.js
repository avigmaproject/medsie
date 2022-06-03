import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import styles from './modal-picker.style'

const ModalPicker = ({ onPress, placeHolder, value }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.placeholder}>{placeHolder}</Text>
        <View style={styles.editTextView}> 
            <View style={styles.input}>
              <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    </TouchableOpacity>
)

export default ModalPicker