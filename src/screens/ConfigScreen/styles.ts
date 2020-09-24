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
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
    overflow: 'hidden',
  },
  textRegisterAccounts: {
    marginTop: 20,
    marginLeft: 20,
  },
  buttonAdd: {
    padding: 10,
    backgroundColor: Colors.COMMENT,
    marginHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textButtonAdd: {
    color: Colors.CYAN,
  },
  boxNothingAccounts: {
    backgroundColor: Colors.COMMENT,
    opacity: 0.9,
    padding: 20,
    borderRadius: 29,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textNothingAccount: {
    color: Colors.CYAN,
    marginBottom: 20,
  },
});
