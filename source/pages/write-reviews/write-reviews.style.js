import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
  inputContainer: {
    paddingTop: 15,
    margin: 10
  },
  buttonContainer: {
    paddingTop: 15,
    margin: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
    },
  innercontainer: {
    height: 90,
    width: '90%',
    padding: 10,
    marginBottom: 5
    },
  info: {
    height: '100%',
    width: '80%',
    marginLeft: 10
    },
  title: {
    fontSize: 21,
    fontFamily: 'Asap-Regular'
    },
  imageView: {
    width: 90, 
    height: 90,
    },
    back: {
      margin: 10
    }
})

export default styles