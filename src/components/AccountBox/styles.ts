import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants';

export default StyleSheet.create({
  boxAccount: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: 'rgb(90,75,129)',
    marginTop: 10,
  },
  boxButtonEdit: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  textNameAccount: {
    textAlign: 'center',
    color: Colors.CYAN,
  },
  boxText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCurrMoney: {
    color: Colors.CYAN,
    marginLeft: 15,
    marginTop: 15,
  },
  textAccount: {
    color: Colors.CYAN,
    fontFamily: 'Century Gothic',
    fontSize: 20,
    padding: 0,
  },
  boxMoney: {
    backgroundColor: Colors.CYAN,
    opacity: 0.6,
    paddingVertical: 5,
    paddingLeft: 15,
    borderRadius: 19,
    marginTop: 10,
  },
});
