import Realm from 'realm';
const RecipeSchema = {
  name: '_Recipe',
  properties: {
    id: 'objectId',
    setname: 'string',
    setcalories: 'string',
    setpreptime: 'string',
  },
  primaryKey: 'id',
};

export default new Realm({schema: RecipeSchema});
