import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  boxHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.CYAN,
    justifyContent: 'space-between',
  },
  buttonAdd: {
    backgroundColor: Colors.COMMENT,
    padding: 10,
    borderRadius: 10,
  },
  boxResume: {
    backgroundColor: Colors.CYAN,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 30,
    alignItems: 'flex-start',
    height: '30%',
  },
  textWallet: {
    fontSize: 40,
  },
  textBalance: {
    color: Colors.YELLOW,
    marginVertical: 20,
  },
  buttonChangeCurrency: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.BG,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textCurrency: {
    color: 'white',
  },
  boxContentResume: {
    marginLeft: 60,
  },
  containerSvg: {
    ...StyleSheet.absoluteFillObject,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    zIndex: -1,
  },
  listTransations: {
    zIndex: 0,
    marginTop: 20,
  },
  listTransationsContent: {
    paddingBottom: 0,
  },
});
