import {StyleSheet, Dimensions} from 'react-native';

import {Color} from '../../assets/color/color.assets';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },
  innerContainer: {
    margin: 10,
    flex: 1
  },
  back: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  cardView: {
    height: 40,
    width: width,
  },
  filterButton: {
    width: width / 2,
    height: 50,
    backgroundColor: Color.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0.5,
  },
  horizontalView: {
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Asap-Regular',
    fontSize: 16,
    color: 'white'
  },
  paragraph: {
    fontFamily: 'Asap-Regular'
  }
});

export default styles;
