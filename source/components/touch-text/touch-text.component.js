import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './touch-text.style'

const TouchText = ({ title, onPress, txtstyle }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, {...txtstyle}]}>{title}</Text>
    </TouchableOpacity>
)

export default TouchText;