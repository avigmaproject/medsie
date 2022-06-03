import React from 'react';
import {View, Text, InputText} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './google-auto-complete.style'

const GoogleAutoComplete = ({ onPress, placeHolder, ref }) => (
    <View>
    <Text style={styles.placeholder}>{placeHolder}</Text>
    <View style={styles.editTextView}> 
        <GooglePlacesAutocomplete
            ref={ref}
            placeholder=''
            onPress={onPress}
            query={{
                key: 'AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA',
                language: 'en',
            }}
            fetchDetails={true}
            listViewDisplayed={false}
            styles={[styles.description, styles.predefinedPlacesDescription, styles.listView, styles.textInput, styles.textInputContainer]}
            />
        </View>
    </View>
)

export default GoogleAutoComplete