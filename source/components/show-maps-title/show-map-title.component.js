import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';

import NoBackgroundButton from '../no-background-button/no-background-button.component';

import styles from './show-map-title.style';

const ShowMapsTitle = ({title, onPress}) => (
  <View>
    <View style={styles.titleView}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.showMap} onPress={onPress}>
        <Text style={styles.title}>Show Maps</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ShowMapsTitle;
