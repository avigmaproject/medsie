import React, {Component} from 'react';
import {TouchableOpacity, TextInput, View} from 'react-native';
import {Text} from 'react-native-paper'

import styles from './search-text-input.style'

const SearchTextInput = ({location, value, onChangeText}) => (
    <View style={styles.inputContainer}>
        <TextInput style={styles.searchText} value={value} onChangeText={onChangeText} placeholder="Search"/>
    </View>
)

export default SearchTextInput;