import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    border: {
        borderBottomWidth: 0.5,
        borderColor: Color.txtGrey,
        marginTop: 11,
        marginBottom: 11
    },
    innerContainer: {
        padding: 10
    },
    main: {
        flex: 1
    },
    title: {
        alignSelf: 'center',
        fontFamily: 'Asap-Regular',
        fontSize: 18,
        color: Color.primaryColor
    }
})

export default styles