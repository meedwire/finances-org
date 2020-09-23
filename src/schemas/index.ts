import Realm from 'realm';
import SpendingSchema from './SpendingSchema';
import BalanceSchema from './BalanceSchema';
import AccountsSchema from './AccountsSchema';
import ConfigSchema from './ConfigSchema';

export default function getRealm() {
  return Realm.open({
    schema: [SpendingSchema, BalanceSchema, AccountsSchema, ConfigSchema],
    schemaVersion: 1,
  });
}
