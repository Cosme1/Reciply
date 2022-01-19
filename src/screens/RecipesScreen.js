import React, {useEffect, useState} from 'react';
import {
  AppRegistry,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native-elements/dist/image/Image';
import CreateRecipeLayout from './CreateRecipeScreen';
import {Food, recipeNameArray} from './CreateRecipeScreen';
import realm from '../database/Realm';
import {RecipeItem} from '../components/RecipeItem';
import {Icon, Button} from 'react-native-elements';

// export function setNewRecipe(Name, Calories, vegetarian, preptime) {
//   //store.get('key').then(key => const key);
//   //   console.log(key + 'key');
//   //   store.get(key).then(value => {
//   //     tempname = value.setname;
//   //   });
//   //   store.get(key).then(value => {
//   //     console.log(value.setcalories + ' value');
//   //     tempcalories = value.setcalories;
//   //   });
//   //   store.get(key).then(value => {
//   //     console.log(value.setpreptime + ' value');
//   //     temppreptime = value.setpreptime;
//   //   });
//   //   index = index + 1;
//   //   console.log(index);
//   const NewRecipe = realm.objects('_RecipeSchema');
//   return (
//     <TouchableHighlight style={{paddingVertical: 5}}>
//       <View style={styles.button}>
//         <View>
//           <Text style={styles.foodTitle}>{NewRecipename}</Text>
//           {vegetarian ? (
//             <Text style={styles.foodSubtitle}>Vegetarian</Text>
//           ) : null}
//           <Text style={styles.foodSubtitle}>Calories: {Calories}</Text>
//         </View>
//         <Image
//           source={require('../assets/pizza.jpg')}
//           style={styles.image}></Image>
//       </View>
//     </TouchableHighlight>
//   );
// }
const test = [2, 3, 4];
let Pizza = new Food('Pizza', 2269, true, 30);
let Pasta = new Food('Pasta', 2269, false, 30);

// function GetRecipe() {
//   Realm.open({schema: [RecipeSchema]});
//   console.log(Realm.objects('_Recipe'));
//   const recipesData = Realm.objects('_Recipe');
//   setrecipes(recipesData);
// }
export function RecipeLayout({navigation}) {
  let veg;
  if (Pizza.vegetarian === true) {
    veg = <Text style={styles.foodSubtitle}>Vegetarian</Text>;
  } else {
    veg = null;
  }
  const [recipes, setrecipes] = useState([]);
  console.log('length: ', recipes.length);
  console.log(recipes.toString().length);
  console.log(JSON.stringify(recipes));

  console.log('Objects: ', realm.objects('_Recipe'));
  const Recipes = realm.objects('_Recipe');
  console.log(
    `These are all recipes: ${Recipes.map(Recipe => Recipe.setname)}`,
  );
  realm.addListener('change', () => {
    setrecipes([Recipes]);
    console.log(`Added ${Recipes.toJSON}`);
  });
  useEffect(() => {
    // Realm.open({
    //   path: 'RealmDatabase.realm',
    //   schema: [RecipeSchema],
    // }).then(realm => {
    //   setrecipes([realm]);
    // });
    //console.log(`These are all recipes: ${Recipes.map(Recipe => Recipe.name)}`);
    //setrecipes([Recipes]);

    navigation.setOptions({
      headerRight: function Header() {
        return (
          <Button
            type="clear"
            title="&#x2b;"
            onPress={() => navigation.navigate('CreateRecipe')}
            titleStyle={styles.addButton}
            //style={{transform: [{scale: 0.12}, {translateX: 900}]}}
          />
        );
      },
    });
  }, [navigation, Recipes]);
  //   let array = listRecipes.map(count => {
  //     <TouchableHighlight style={{paddingVertical: 5}} key={count}>
  //       <View style={styles.button}>
  //         <View>
  //           <Text style={styles.foodTitle}>{tempname}</Text>
  //           <Text style={styles.foodSubtitle}>Calories: {tempcalories}</Text>
  //         </View>
  //         <Image
  //           source={require('../assets/pizza.jpg')}
  //           style={styles.image}></Image>
  //       </View>
  //     </TouchableHighlight>;
  //   });

  return (
    <ScrollView style={styles.container}>
      <TouchableHighlight style={{paddingVertical: 5}}>
        <View style={styles.button}>
          <View>
            <Text style={styles.foodTitle}>{Pizza.name}</Text>
            {veg}
            <Text style={styles.foodSubtitle}>Calories: {Pizza.calories}</Text>
          </View>
          <Image
            source={require('../assets/pizza.jpg')}
            style={styles.image}></Image>
        </View>
      </TouchableHighlight>

      <TouchableHighlight style={{paddingVertical: 5}}>
        <View style={styles.button}>
          <View>
            <Text style={styles.foodTitle}>{Pasta.name}</Text>
            {veg}
            <Text style={styles.foodSubtitle}>Calories: {Pasta.calories}</Text>
          </View>
          <Image
            source={require('../assets/pizza.jpg')}
            style={styles.image}></Image>
        </View>
      </TouchableHighlight>
      {Recipes.map(_recipe => (
        <RecipeItem key={`${_recipe.id}`} recipe={_recipe} />
      ))}
      {recipes.map(recipe => {
        <TouchableHighlight
          key={`${recipe.length}`}
          style={{paddingVertical: 5}}>
          <View style={styles.button}>
            <View>
              <Text style={styles.foodTitle}>{recipe.name}</Text>
              {recipe.vegetarian ? (
                <Text style={styles.foodSubtitle}>Vegetarian</Text>
              ) : null}
              <Text style={styles.foodSubtitle}>
                Calories: {recipe.calories}
              </Text>
            </View>
            <Image
              source={require('../assets/pizza.jpg')}
              style={styles.image}></Image>
          </View>
        </TouchableHighlight>;
      })}
      {test.map(tests => (
        <Text key={tests}>Test {tests}</Text>
      ))}
    </ScrollView>
  );
}

// function RecipesScreen({navigation}) {
//   const Stack = createStackNavigator();
//   const Drawer = createDrawerNavigator();
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Recipes"
//         component={RecipeLayout}
//         options={{
//           title: 'Recipes',
//           headerStyle: {
//             backgroundColor: '#9fc786',
//           },
//           headerTitleStyle: {
//             color: '#fff',
//             fontSize: 25,
//           },
//           //   headerLeft: () => (
//           //     <TouchableOpacity
//           //       style={{
//           //         transform: [{scale: 0.55}],
//           //       }}
//           //       onPress={() => navigation.openDrawer()}>
//           //       <Image source={require('../assets/ScreenButton.png')} />
//           //     </TouchableOpacity>
//           //   ),
//           headerRight: () => (
//             <TouchableOpacity
//               style={{
//                 transform: [{scale: 0.12}, {translateX: 900}],
//               }}
//               onPress={() => navigation.navigate('Add Recipe')}>
//               <Image source={require('../assets/Add.png')} />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="Add Recipe"
//         component={CreateRecipeScreen}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CCCCCC',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },

  foodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  foodSubtitle: {
    fontSize: 10,
    color: 'black',
  },

  vegetarian: {
    fontSize: 10,
    color: 'green', //edit that later on
  },

  addButton: {
    fontSize: 30,
    fontWeight: '400',
  },
});

//export default RecipesScreen;
