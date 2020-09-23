import {ObjectSchema} from 'realm';

const ConfigSchema: ObjectSchema = {
  name: 'Config',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    currAccount: 'string',
  },
};

export default ConfigSchema;
