import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    placeholder:  {
        fontSize: 14,
        color: Color.grey,
        fontFamily: 'Asap-Regular',
    },
    editTextView: {
        marginTop: 10
    },
    input: {
        color: "#000000",
        borderRadius: 5,
        height: 48,
        width: "100%",
        borderColor: Color.grey,
        padding: 12,
        borderWidth: 0.5,
    },
    value: {
        fontFamily: 'Asap-Regular',
        fontSize: 17,
    }
})

export default styles