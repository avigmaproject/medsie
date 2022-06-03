import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    placeholder:  {
        fontSize: 14,
        alignItems: 'flex-start',
        fontFamily: 'Asap-Regular',
        color: Color.grey,
    },
    editTextView: {
        marginTop: 15
    },
    input: {
        color: "#000000",
        borderRadius: 5,
        height: 150,
        width: "100%",
        borderColor: Color.grey,
        padding: 15,
        fontSize: 17,
        borderWidth: 0.5,
        textAlignVertical: 'top'
    },
    titleView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    message: {
        fontSize: 14,
        fontFamily: 'Asap-Regular',
        color: Color.lightGrey,
    },
})

export default styles