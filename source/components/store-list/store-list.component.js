import React from 'react';
import {View, FlatList} from 'react-native';
import StoreElement from '../store-element/store-element.component';
import styles from './store-list.style';

const StoreList = ({navigation, storeList}) => (
  <View style={styles.container}>
    <FlatList
      data={storeList}
      renderItem={(item) => (
        <StoreElement item={item} navigation={navigation} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export default StoreList;
