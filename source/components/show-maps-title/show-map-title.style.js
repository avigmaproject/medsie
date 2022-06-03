import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets';

const styles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  showMap: {
    borderWidth: 0.7,
    padding: 5,
    borderRadius: 5,
    margin: 1,
    borderColor: Color.primaryColor,
  },
  title: {
    fontFamily: 'Asap-Regular',
    fontSize: 14,
    color: Color.primaryColor,
  },
});

export default styles;
