import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {Recipe} from './Schemas';
import {RecipeLayout} from '../screens/RecipesScreen';
import {getRealmApp} from '../../getRealmApp';

const app = getRealmApp();

const RecipeContext = React.createContext(null);

const Provider = ({View, navigation, ID}) => {
  // The recipes list will contain the recipes in the realm when opened
  const [recipes, setRecipes] = useState([]);
  const realmRef = useRef(null);

  //   useEffect(() => {
  //     console.log(`Attempting to open Realm with config: ${JSON}`);

  //     Realm.open({}).then(projectRealm => {
  //       realmRef.current = projectRealm;
  //       //const syncRecipes = projectRealm.objects('_Recipe');
  //       //let sortedRecipes = syncRecipes.sorted('name');
  //     //   setRecipes([...sortedRecipes]);
  //     //   sortedRecipes.addListener(() => {
  //     //     setRecipes([...sortedRecipes]);
  //     });

  //     // cleanup function to close the realm and delete useless data
  //     return () => {
  //       const projectRealm = realmRef.current;
  //       if (projectRealm) {
  //         projectRealm.close();
  //         realmRef.current = null;
  //       }
  //     };
  // },

  //when called it adds a new 'Recipe' from the schema to the database
  const createRecipe = (newRecipeName, newCalories, newPrepTime) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.create(
        '_Recipe',
        new Recipe({
          name: newRecipeName || 'New Recipe',
          setcalories: newCalories,
          id: ID,
        }),
      );
    });
  };

  const deleteRecipe = props => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(props);
    });
  };

  return (
    <RecipeContext.Provider value={{createRecipe, deleteRecipe, recipes}}>
      <RecipeLayout navigation={navigation}></RecipeLayout>
    </RecipeContext.Provider>
  );
};

const useRecipe = () => {
  const recontext = useContext(RecipeContext);
  if (recontext == null) {
    throw new Error('called the useRecipe() outside of Provider');
  }
  return recontext;
};
export {Provider, useRecipe};
