import {StyleSheet} from 'react-native'

import {Color} from '../../assets/color/color.assets'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backGroundColor,
    padding: 3
    },
  innerContainer: {
    padding: 10,
    backgroundColor: Color.backGroundColor,
    marginTop: 85,
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
      fontSize: 14,
      color: Color.grey
  },
  accountView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30
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
    fontSize: 14,
      fontFamily: 'Asap-Regular',
  },
  createTouchTxt: {
      color: Color.primaryColor, 
      fontSize: 14,
      fontFamily: 'Asap-Regular',
  },
  loginText: {
      fontSize: 16,
      marginTop: 20,
        fontFamily: 'Asap-SemiBold',
  },
  title: {
      fontSize: 22,
      width: "100%",
      marginTop: 15,
      fontFamily: 'Asap-SemiBold',
      textAlign: 'center',
  },
  toasttxt: {
    fontFamily: 'Asap-Regular',
  },
  headerView: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  skip: {
    fontFamily: 'Asap-Regular',
    marginTop: 10
  },
})

export default styles