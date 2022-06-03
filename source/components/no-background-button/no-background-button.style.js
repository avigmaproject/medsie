import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    showMap: {
        borderWidth: 0.7,
        borderColor: Color.grey,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 5,
        margin: 1
    },
    title: {
        fontFamily: 'Asap-Regular',
        fontSize: 14,
        color: Color.grey
    }
})

export default styles