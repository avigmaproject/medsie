import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    container: {
        height: 155,
        width: '90%',
        padding: 10
    },
    info: {
        height: '100%',
        width: '80%',
        marginLeft: 10
    },
    title: {
        fontSize: 21,
        fontFamily: 'Asap-Regular'
    },
    caption: {
        fontSize: 14,
        fontFamily: 'Asap-Regular',
        color: Color.txtGrey,
    },
    min: {
        fontSize: 14,
        fontFamily: 'Asap-Regular',
        color: Color.primaryColor,
    },
  imageView: {
    width: 100, 
    height: 100,
    },
    icon: {
        marginLeft: 10
    },
    rating: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
    },
    hor: {
        flexDirection: 'row'
    },
})

export default styles