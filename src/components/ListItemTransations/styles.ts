import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  containerItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textDescription: {
    color: 'white',
    textAlign: 'left',
    marginLeft: 10,
  },
  textValue: {
    color: 'white',
    marginLeft: 'auto',
  },
});
