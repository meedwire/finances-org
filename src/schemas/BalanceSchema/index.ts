import {ObjectSchema} from 'realm';

const BalanceSchema: ObjectSchema = {
  name: 'Balance',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    type: 'string',
    value: {type: 'float'},
    description: 'string',
    created: 'date',
  },
};

export default BalanceSchema;
