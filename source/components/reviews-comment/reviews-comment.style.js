import { StyleSheet } from "react-native";

import {Color} from '../../assets/color/color.assets';

const styles = StyleSheet.create({
    card: {
        width: '100%',
        paddingTop: 25,
        paddingBottom: 15,
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 10
    },
    row: {
        flexDirection: 'row'
    },
    usernameContainer: {
        marginLeft: 10
    },
    ratingStarView: {
        alignItems: 'center'
    },
    ratinTxt: {
        marginLeft: 10
    }
})

export default styles