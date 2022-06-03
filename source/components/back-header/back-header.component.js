import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Title} from 'react-native-paper';
import Icons from 'react-native-vector-icons/AntDesign';

import styles from './back-header.style';

const BackHeader = ({navigation, title}) =>  (
  <TouchableOpacity style={styles.titleView} onPress={() => navigation.goBack()}>
    <View style={styles.rowObject}>
    <View>
      <Icons
        name="arrowleft"
        color={'rgb(33, 47, 60)'}
        size={24}
      />
    </View>
    <Title
      style={[
        styles.title,
        {
          color:'rgb(33, 47, 60)',
        },
      ]}>
      {title}
    </Title>
  </View>
  </TouchableOpacity>
    )
export default BackHeader;