import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starView: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  manageStore: {
    margin: 10,
    // marginBottom: 100,
  },
  innerContainer: {
    margin: 15,
  },
  visit: {
    backgroundColor: Color.primaryColor,
    fontSize: 16,
    fontFamily: 'Asap-SemiBold',
    margin: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  buttonContainer: {
    marginTop: 10,
    margin: 15,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
});

export default styles;
