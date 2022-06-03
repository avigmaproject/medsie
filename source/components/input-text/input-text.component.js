import React from 'react';
import {View, TextInput, Text} from 'react-native';

import styles from './input-text.style'

const InputText = ({ value, keyboardType, onChangeText, placeHolder, editable }) => (
    <View>
        <Text style={styles.placeholder}>{placeHolder}</Text>
        <View style={styles.editTextView}> 
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                editable={editable}
        />
        </View>
    </View>
)

export default InputText