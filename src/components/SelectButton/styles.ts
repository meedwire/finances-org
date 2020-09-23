import {StyleSheet} from 'react-native';
import {Colors} from '../../Constants';

export default StyleSheet.create({
  buttonChangeCurrency: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.COMMENT,
    borderRadius: 20,
    paddingVertical: 12,
    width: '100%',
    paddingLeft: 8,
    paddingRight: 15,
  },
  textCurrency: {
    color: 'white',
    textAlign: 'center',
  },
  boxSelection: {
    backgroundColor: Colors.COMMENT,
    position: 'absolute',
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 10,
    overflow: 'hidden',
    zIndex: 999,
  },
  buttonBoxSelection: {
    zIndex: 999,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  icon: {position: 'absolute', left: 10},
});
