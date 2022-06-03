import React, {Component} from 'react';
import {FlatList} from 'react-native';

import ManageStoreElement from '../manage-store-element/manage-store-element.component';

const ManageStoreList = ({list, navigation}) => (
  <FlatList
    data={list}
    extraData={list}
    initialNumToRender={20}
    renderItem={({item, index}) => (
      <ManageStoreElement item={item} key={index} navigation={navigation}/>
    )}
  />
);

export default ManageStoreList;
