import {ObjectSchema} from 'realm';

const SpendingSchema: ObjectSchema = {
  name: 'Spending',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    type: 'string',
    value: {type: 'float'},
    operation: 'string',
    description: 'string',
    full_description: 'string',
    created: 'date',
  },
};

export default SpendingSchema;
