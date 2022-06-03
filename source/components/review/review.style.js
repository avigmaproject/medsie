import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: '90%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingContainer: {
        marginLeft: 10,
        justifyContent: 'flex-end'
    },
    rating: {
        fontFamily: 'Asap-SemiBold',
        fontSize: 30,
        color: Color.txtGrey
    },
    center: {
        alignItems: 'center'
    },
    totalRating: {
        fontFamily: 'Asap-Regular',
        color: Color.txtGrey
    },
    title: {
        fontFamily: 'Asap-Regular',
        fontSize: 16,
    }
})

export default styles