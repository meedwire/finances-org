import { StyleSheet } from 'react-native';

import { Colors } from '../../Constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  essentialExpenses: {
    position: 'absolute',
    backgroundColor: Colors.YELLOW,
    width: 30,
    height: 150,
    borderRadius: 30,
    bottom: 0,
  },
  superfluousExpenses: {
    position: 'absolute',
    backgroundColor: Colors.RED,
    width: 30,
    height: 80,
    borderRadius: 30,
    bottom: 0,
  },
  totalExpenses: {
    position: 'absolute',
    backgroundColor: Colors.GREEN,
    width: 30,
    height: 70,
    borderRadius: 30,
    bottom: 0,
  },
});
