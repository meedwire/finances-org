import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants';

export default StyleSheet.create({
  containerOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerContent: {
    padding: 20,
    width: '80%',
    backgroundColor: Colors.CYAN,
    borderRadius: 30,
  },
  line: {
    width: '100%',
    borderBottomWidth: 0.4,
    borderColor: Colors.SELECTION,
    paddingTop: 5,
    marginBottom: 10,
  },
  textLaunch: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
    marginTop: 20,
  },
  textInput: {
    width: '100%',
    borderColor: Colors.BG,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  textArea: {
    width: '100%',
    borderColor: Colors.BG,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  button: {
    width: '100%',
    borderColor: Colors.BG,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Colors.BG,
  },
  textButton: {
    fontSize: 18,
    color: Colors.CYAN,
  },
});
