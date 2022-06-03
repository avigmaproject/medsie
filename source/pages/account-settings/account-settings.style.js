import { StyleSheet } from "react-native";

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.backGroundColor,
    },
    row: {
        flexDirection: 'row'
    },
    titleContainer: {
        justifyContent: 'space-between'
    },
    innerContainer: {
      padding: 10,
        backgroundColor: Color.backGroundColor,
    },
    titeText: {
        fontFamily: 'Asap-SemiBold',
        fontSize: 16
    },
    editText: {
        fontFamily: 'Asap-Regular',
        fontSize: 14,
        color: Color.txtGrey
    },
  inputContainer: {
    paddingTop: 15,
  },
  buttonContainer: {
    paddingTop: 20,
  },
})

export default styles;