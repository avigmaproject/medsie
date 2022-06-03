import React, {Component} from 'react';
import {View, Modal, FlatList, TouchableOpacity} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';

import styles from './modal-list.style';

class ModalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  displayLabel = (item) => (
    <TouchableRipple
      rippleColor="rgba(0, 0, 0, .32)"
      onPress={() => this.addValue(item)}>
      <View style={styles.labelView}>
        <Text style={styles.label}> {item.type} </Text>
      </View>
    </TouchableRipple>
  );

  addValue = (item) => {
    const {id, changeState, pkid} = this.props;
    changeState(id, item.type);
    changeState(pkid, item.id);
    this.closeModal();
  }; 

  closeModal = () => {
    const {changeModalVisibility} = this.props;
    changeModalVisibility(false);
  };

  render() {
    const {isModalVisible, list} = this.props;

    return (
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.modalBackground} onPressOut={() => this.closeModal()}>
          <View style={styles.modalList}>
            {list.length !== 0 ? <FlatList
              data={list}
              renderItem={({item}) => this.displayLabel(item)}
            /> : <View style={styles.labelView}>
        <Text style={styles.label}> No Current Data </Text>
      </View>}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default ModalList;
