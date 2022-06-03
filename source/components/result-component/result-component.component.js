import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';

import ResultElement from '../result-element/result-element.component';

import styles from './result-component.style';

const ResultCategory = ({list, navigation}) => (
  <View style={styles.categoryList}>
    <FlatList
      data={list}
      renderItem={(item, index) => (
        <ResultElement item={item.item} key={index} navigation={navigation} />
      )}
      keyExtractor={(item, index) => item.id}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  </View>
); 

export default ResultCategory;
