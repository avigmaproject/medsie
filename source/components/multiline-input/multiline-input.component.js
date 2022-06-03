import React from 'react';
import {View, TextInput, Text} from 'react-native';

import styles from './multiline-input.style'

const MultilineInput = ({ value, keyboardType, onChangeText, placeHolder, message }) => (
    <View>
        <View style={styles.titleView}>
            <View>
                <Text style={styles.placeholder}>{placeHolder}</Text>
            </View>
            <View>
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
        <View style={styles.editTextView}> 
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                multiline={true}
        />
        </View>
    </View>
)

export default MultilineInput