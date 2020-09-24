import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from '../../Constants';

export default StyleSheet.create({
  containerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(25, 22, 34, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 40,
  },
  containerContent: {
    width: Dimensions.get('window').width - 40,
    padding: 20,
    backgroundColor: Colors.CYAN,
    borderRadius: 30,
    overflow: 'hidden',
  },
  textLaunch: {
    fontSize: 25,
    marginTop: 20,
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
    marginTop: 20,
    color: Colors.INTERMEDIATE,
  },
  textInput: {
    width: '100%',
    borderRadius: 50,
    marginTop: 7,
    paddingHorizontal: 20,
    backgroundColor: Colors.COMMENT,
    opacity: 0.7,
  },
  button: {
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.COMMENT,
  },
  textButton: {
    fontSize: 18,
    color: Colors.CYAN,
  },
});
