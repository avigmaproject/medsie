import {StyleSheet} from 'react-native';

import {Color} from '../../assets/color/color.assets';

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 14,
    color: Color.grey,
    fontFamily: 'Asap-Regular',
  },
  editTextView: {
    marginTop: 10,
    borderColor: Color.grey,
    borderWidth: 0.5,
  },
  description: {
    fontFamily: 'Asap-Regular',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  listView: {
    color: 'black', //To see where exactly the list is
    zIndex: 1000, //To popover the component outwards
    position: 'absolute',
    top: 45,
  },
  textInput: {
    backgroundColor: '#000',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
  },
  textInputContainer: {
    backgroundColor: '#000',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
  },
});

export default styles;
