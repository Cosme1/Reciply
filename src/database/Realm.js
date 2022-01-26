import Realm from 'realm';
export const RecipeSchema = {
  name: '_Recipe',
  properties: {
    id: 'objectId',
    setname: 'string',
    setcalories: 'string',
    setpreptime: 'string',
  },
  primaryKey: 'id',
};

export const RecipeSchemaV1 = {
  name: '_Recipe',
  properties: {
    id: 'objectId',
    setname: 'string',
    setcalories: 'string',
    setpreptime: 'string',
    image: 'string?',
    instructions: {type: 'string?[]'},
    ingredients: 'string?',
  },
  primaryKey: 'id',
};

export default new Realm({
  schema: [RecipeSchemaV1],
  path: 'RealmDatabase.realm',
  schemaVersion: 3,
});
