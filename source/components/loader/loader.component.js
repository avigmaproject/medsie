import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

import {Color} from '../../assets/color/color.assets'

import styles from './loader.style';

const Loader = ({isLoader}) => (
  <Modal
    transparent={true}
    animationType={'fade'}
    visible={isLoader}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator animating={isLoader} size="small" color={Color.primaryColor} />
      </View>
    </View>
  </Modal>
);

export default Loader;