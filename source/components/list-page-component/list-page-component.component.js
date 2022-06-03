import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import ListPageElement from '../list-page-element/list-page-element.component';

import styles from './list-page-component.style';

const ListPageComponent = ({list, navigation}) => (
  <View style={styles.categoryList}>
    <FlatList
      data={list}
      renderItem={(item, index) => (
        <ListPageElement item={item} key={index} navigation={navigation} />
      )}
      keyExtractor={(item, index) => `list-page-item-${item.id}-${index}`}
    />
  </View>
);

export default ListPageComponent;
