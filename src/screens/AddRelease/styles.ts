import { StyleSheet } from 'react-native';

import { Colors } from '../../Constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    backgroundColor: Colors.CYAN,
    padding: 20,
    marginTop: 20,
    borderBottomEndRadius: 26,
    borderBottomStartRadius: 26,
    overflow: 'hidden',
  },
  textHeader: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.FG,
  },
  line: {
    width: '100%',
    borderBottomWidth: 0.4,
    borderColor: Colors.SELECTION,
    paddingTop: 5,
    marginBottom: 10,
  },
  textLaunch: {
    marginBottom: 5,
    marginLeft: 15,
    marginTop: 30,
    color: Colors.SELECTION,
  },
  text: {
    marginLeft: 20,
    fontSize: 18,
    marginTop: 20,
    color: '#c4bbe6',
  },
  textInput: {
    width: '100%',
    borderRadius: 50,
    marginTop: 7,
    paddingHorizontal: 20,
    backgroundColor: Colors.COMMENT,
    opacity: 0.7,
  },
  textArea: {
    width: '100%',
    borderRadius: 19,
    textAlignVertical: 'top',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    marginTop: 7,
    backgroundColor: Colors.COMMENT,
    opacity: 0.7,
  },
  button: {
    borderColor: Colors.BG,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: Colors.BG,
  },
  textButton: {
    fontSize: 18,
    color: Colors.CYAN,
  },
});
