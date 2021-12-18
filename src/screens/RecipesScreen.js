import React, {useEffect} from 'react';
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
import {useRecipe} from '../database/Provider';
import Realm from 'realm';
import {RecipeItem} from '../components/RecipeItem';
import {AddRecipe} from '../components/';
import {Icon, Button} from 'react-native-elements';

var tempname;
var tempcalories;
var temppreptime;
var index = 0;
const listRecipes = [];

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

let Pizza = new Food('Pizza', 2269, true, 30);
let Pasta = new Food('Pasta', 2269, true, 30);

export function RecipeLayout({navigation}) {
  if (Pizza.vegetarian == true) {
    veg = <Text style={styles.foodSubtitle}>Vegetarian</Text>;
  } else {
    veg = null;
  }
  console.log('test1');
  const {recipes, createRecipe} = useRecipe();
  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return (
          <Button
            type="clear"
            title="&#x2b;"
            onPress={() =>
              navigation.navigate('CreateRecipe', {createRecipe: createRecipe})
            }
            titleStyle={styles.addButton}
            //style={{transform: [{scale: 0.12}, {translateX: 900}]}}
          />
        );
      },
    });
  });
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
    //recipe.map(recipe => (recipe ? <RecipeItem recipe={recipe} /> : null))
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
      {recipes.map(recipe =>
        recipe ? <RecipeItem key={`${recipe.id}`} recipe={recipe} /> : null,
      )}
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
