import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  card: {
    width: width / 2.8,
    marginRight: 10,
    borderRadius: 5,
  },
  image: {
    height: 120,
  },
  cardView: {
    padding: 5,
  },
  body: {
    padding: 8,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  horizontalView: {
    flexDirection: 'row',
  },
  ratingView: {
    height: '10%',
  },
  title: {
    fontFamily: 'Asap-Regular',
    fontSize: 16,
  },
  caption: {
    fontFamily: 'Asap-Regular',
  },
  place: {
    fontFamily: 'Asap-Regular',
  },
  starView: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  icon: {
    marginLeft: 10,
  },
});

export default styles;
