import React from 'react';
import {
  Button,
  Image,
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

import CreateRecipeScreen from './CreateRecipeScreen';

function Ingredients() {}

export function Food(name, calories, vegetarian, preptime) {
  this.name = name;
  this.calories = calories;
  this.vegetarian = vegetarian;
  this.preptime = preptime;
}

let Pizza = new Food('Pizza', 2269, true, 30);
let Pasta = new Food('Pasta', 2269, true, 30);

function RecipeLayout() {
//   if (Pizza.vegetarian === true) {
//     veg = <Text style={styles.foodSubtitle}>Vegetarian</Text>;
//   } else {
//     veg = null;
//   }
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
    </ScrollView>
  );
}

function RecipesScreen({navigation}) {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recipes"
        component={RecipeLayout}
        options={{
          title: 'Recipes',
          headerStyle: {
            backgroundColor: '#9fc786',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 25,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                transform: [{translateX: -390}, {scale: 0.045}, {scaleX: 0.9}],
              }}
              onPress={() => navigation.openDrawer()}>
              <Image source={require('../assets/ScreenButton.png')} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{
                transform: [{scale: 0.12}, {translateX: 900}],
              }}
              onPress={() => navigation.navigate('Add Recipe')}>
              <Image source={require('../assets/Add.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Add Recipe"
        component={CreateRecipeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

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
});

export default RecipesScreen;
