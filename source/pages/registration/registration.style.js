import {StyleSheet} from 'react-native'

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.backGroundColor,
    },
    innerContainer: {
        backgroundColor: Color.backGroundColor,
    padding: 10,
    },
  inputContainer: {
    paddingTop: 15,
  },
  buttonContainer: {
    paddingTop: 15,
  },
  forgotPassView: { 
    width: '100%',
    alignItems: 'center',
    marginTop: 18
  },
  forgotPassword: {
      fontSize: 15
  },
  accountView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 18
  },
  accountText: {
      fontSize: 14,
      fontFamily: 'Asap-Regular',
  },
  createAcTouch: {
      flexDirection: 'row',
      fontFamily: 'Asap-Regular',
  },
  createTxt: {
    fontSize: 14
  },
  createTouchTxt: {
      color: Color.primaryColor, 
      fontSize: 14
  },
  loginText: {
      fontSize: 16,
      fontFamily: 'Asap-SemiBold',
  },
  toasttxt: {
    fontFamily: 'Asap-Regular',
  }
})

export default styles