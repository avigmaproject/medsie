import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    rowContainer: {
        width: '50%'
    },
    viewMargin: {
        marginTop: 5
    },
    close: {
        fontFamily: 'Asap-SemiBold',
        fontSize: 14
    },
    days: {
        color: Color.txtGrey,
        fontFamily: 'Asap-Regular',
        fontSize: 14
    },
    time: {
        fontFamily: 'Asap-Regular',
    }
})

export default styles