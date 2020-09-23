import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants';

export default StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 10,
    margin: 20,
    elevation: 10,
    alignSelf: 'center',
  },
  textDeficitCard: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.GREEN,
    marginTop: 20,
  },
  textNumbercard: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    letterSpacing: 4,
  },
  boxLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCard: {
    width: 50,
    height: 30,
  },
  boxCardOperations: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  buttonLaunch: {
    padding: 10,
  },
});
