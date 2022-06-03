import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    height: 60,
    width: '85%',
    borderRadius: 5,
    borderWidth: 0.7,
    padding: 10,
    borderColor: Color.grey,
  },
  searchText: {
    color: Color.grey,
    fontFamily: 'Asap-Regular',
    fontSize: 14
  },
  location: {
    color: Color.lightGrey,
    fontFamily: 'Asap-Regular',
    fontSize: 14
  }
});

export default styles;
