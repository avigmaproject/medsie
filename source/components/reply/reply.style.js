import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    container: {
        marginLeft: 5,
        marginTop: 5,
        backgroundColor: '#cdcdcd',
        padding: 5
    },
    introductions: {
        color: 'black',
        fontFamily: 'Asap-Regular'
    },
    reply: {
        width: '100%'
    },
    replyText: {
        color: Color.primaryColor,
        fontFamily: 'Asap-Regular',
        marginLeft: 5,
        marginTop: 5,
    }
})

export default styles;