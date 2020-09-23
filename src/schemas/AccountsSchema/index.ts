import { ObjectSchema } from 'realm';

const AccountsSchema: ObjectSchema = {
  name: 'Accounts',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    name: 'string',
    bank: 'string',
    type: 'string',
    value: { type: 'float' },
    description: 'string',
    created: 'date',
  },
};

export default AccountsSchema;
